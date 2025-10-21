export const Rulesets: import('../../../sim/dex-formats').ModdedFormatDataTable = {
	standard: {
		effectType: 'ValidatorRule',
		name: 'Standard',
		ruleset: ['Obtainable', 'Desync Clause Mod', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'Stamina Percentage Mod', 'Cancel Mod'],
		banlist: ['Dig', 'Fly'],
	},
	'350cupmod': {
		effectType: 'Rule',
		name: '350 Cup Mod',
		desc: "If a Pok&eacute;mon's BST is 350 or lower, all of its stats get doubled.",
		onBegin() {
			this.add('rule', '350 Cup Mod: If a Pokemon\'s BST is 350 or lower, all of its stats get doubled.');
		},
		onModifySpecies(species) {
			const newSpecies = this.dex.deepClone(species);
			const bst = newSpecies.bst;
			if (bst <= 350) {
				newSpecies.bst = 0;
				for (const stat in newSpecies.baseStats) {
					if (stat === 'bod') continue;
					newSpecies.baseStats[stat] = this.clampIntRange(newSpecies.baseStats[stat] * 2, 1, 255);
					newSpecies.bst += newSpecies.baseStats[stat];
				}
				newSpecies.baseStats['bod'] = newSpecies.baseStats['boa'];
			}
			return newSpecies;
		},
	},
	flippedmod: {
		effectType: 'Rule',
		name: 'Flipped Mod',
		desc: "Every Pok&eacute;mon's stats are reversed. Stamina becomes Hor, ToA becomes Spc, ToD stays the same.",
		onBegin() {
			this.add('rule', 'Pokemon have their stats flipped (Stamina becomes Hor, vice versa).');
		},
		onModifySpecies(species) {
			const newSpecies = this.dex.deepClone(species);
			const stats: { [k: string]: number } = {
				st: newSpecies.baseStats.hor,
				toa: newSpecies.baseStats.boa,
				tod: newSpecies.baseStats.tod,
				boa: newSpecies.baseStats.toa,
				bod: newSpecies.baseStats.toa,
				hor: newSpecies.baseStats.st,
			};
			for (const i in newSpecies.baseStats) {
				newSpecies.baseStats[i] = stats[i];
			}
			return newSpecies;
		},
	},
	scalemonsmod: {
		effectType: 'Rule',
		name: 'Scalemons Mod',
		desc: "Every Pok&eacute;mon's stats, barring Stamina, are scaled to give them a BST as close to 500 as possible",
		onBegin() {
			this.add('rule', 'Scalemons Mod: Every Pokemon\'s stats, barring Stamina, are scaled to come as close to a BST of 500 as possible');
		},
		onModifySpecies(species, target, source) {
			const newSpecies = this.dex.deepClone(species);
			const pst: number = newSpecies.bst - newSpecies.baseStats['st'];
			const scale = 500 - newSpecies.baseStats['st'];
			newSpecies.bst = newSpecies.baseStats['st'];
			for (const stat in newSpecies.baseStats) {
				if (stat === 'st' || stat === 'bod') continue;
				newSpecies.baseStats[stat] = this.clampIntRange(newSpecies.baseStats[stat] * scale / pst, 1, 255);
				newSpecies.bst += newSpecies.baseStats[stat];
			}
			newSpecies.baseStats['bod'] = newSpecies.baseStats['boa'];
			return newSpecies;
		},
	},
};
