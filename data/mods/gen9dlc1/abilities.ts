export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	commander: {
		inherit: true,
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1 },
	},
	gulpmissile: {
		inherit: true,
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1, notransform: 1 },
	},
	protosynthesis: {
		inherit: true,
		onWeatherChange(pokemon) {
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday')) {
				pokemon.addVolatile('protosynthesis');
			} else if (!pokemon.volatiles['protosynthesis']?.fromBooster && this.field.weather !== 'sunnyday') {
				// Protosynthesis will not deactivite if Sun is suppressed, hence the direct ID check (isWeather respects suppression)
				pokemon.removeVolatile('protosynthesis');
			}
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Protosynthesis', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Protosynthesis');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosynthesis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(toa, pokemon) {
				if (this.effectState.bestStat !== 'toa') return;
				this.debug('Protosynthesis toa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(tod, pokemon) {
				if (this.effectState.bestStat !== 'tod') return;
				this.debug('Protosynthesis tod boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(boa, pokemon) {
				if (this.effectState.bestStat !== 'boa') return;
				this.debug('Protosynthesis boa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(bod, pokemon) {
				if (this.effectState.bestStat !== 'bod') return;
				this.debug('Protosynthesis bod boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(hor, pokemon) {
				if (this.effectState.bestStat !== 'hor') return;
				this.debug('Protosynthesis hor boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosynthesis');
			},
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1, cantsuppress: 1 },
	},
	quarkdrive: {
		inherit: true,
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Quark Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Quark Drive');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarkdrive' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(toa, pokemon) {
				if (this.effectState.bestStat !== 'toa') return;
				this.debug('Quark Drive toa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(tod, pokemon) {
				if (this.effectState.bestStat !== 'tod') return;
				this.debug('Quark Drive tod boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(boa, pokemon) {
				if (this.effectState.bestStat !== 'boa') return;
				this.debug('Quark Drive boa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(bod, pokemon) {
				if (this.effectState.bestStat !== 'bod') return;
				this.debug('Quark Drive bod boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(hor, pokemon) {
				if (this.effectState.bestStat !== 'hor') return;
				this.debug('Quark Drive hor boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Drive');
			},
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1, cantsuppress: 1 },
	},
};
