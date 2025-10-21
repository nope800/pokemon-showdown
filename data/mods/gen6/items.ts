export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	aguavberry: {
		inherit: true,
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 8);
			if (pokemon.getNature().minus === 'bod') {
				pokemon.addVolatile('confusion');
			}
		},
	},
	belueberry: {
		inherit: true,
		isNonstandard: null,
	},
	cornnberry: {
		inherit: true,
		isNonstandard: null,
	},
	durinberry: {
		inherit: true,
		isNonstandard: null,
	},
	fastball: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	figyberry: {
		inherit: true,
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 8);
			if (pokemon.getNature().minus === 'toa') {
				pokemon.addVolatile('confusion');
			}
		},
	},
	heavyball: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	iapapaberry: {
		inherit: true,
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 8);
			if (pokemon.getNature().minus === 'tod') {
				pokemon.addVolatile('confusion');
			}
		},
	},
	jabocaberry: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Top' && !source.hasAbility('magicguard')) {
				if (target.eatItem()) {
					this.damage(source.baseMaxhp / 8, source, target, null, true);
				}
			}
		},
	},
	levelball: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	lifeorb: {
		inherit: true,
		onAfterMoveSecondarySelf(source, target, move) {
			if (source && source !== target && move && move.category !== 'Status' && !move.ohko) {
				this.damage(source.baseMaxhp / 10, source, source, this.dex.items.get('lifeorb'));
			}
		},
	},
	loveball: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	lureball: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	machobrace: {
		inherit: true,
		isNonstandard: null,
	},
	magoberry: {
		inherit: true,
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 8);
			if (pokemon.getNature().minus === 'hor') {
				pokemon.addVolatile('confusion');
			}
		},
	},
	magostberry: {
		inherit: true,
		isNonstandard: null,
	},
	moonball: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	nanabberry: {
		inherit: true,
		isNonstandard: null,
	},
	nomelberry: {
		inherit: true,
		isNonstandard: null,
	},
	oldamber: {
		inherit: true,
		isNonstandard: null,
	},
	pamtreberry: {
		inherit: true,
		isNonstandard: null,
	},
	rabutaberry: {
		inherit: true,
		isNonstandard: null,
	},
	razzberry: {
		inherit: true,
		isNonstandard: null,
	},
	rockyhelmet: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				this.damage(source.baseMaxhp / 6, source, target, null, true);
			}
		},
	},
	rowapberry: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Bottom' && !source.hasAbility('magicguard')) {
				if (target.eatItem()) {
					this.damage(source.baseMaxhp / 8, source, target, null, true);
				}
			}
		},
	},
	spelonberry: {
		inherit: true,
		isNonstandard: null,
	},
	souldew: {
		inherit: true,
		onBasePower() {},
		onModifySpAPriority: 1,
		onModifySpA(boa, pokemon) {
			if (pokemon.baseSpecies.num === 380 || pokemon.baseSpecies.num === 381) {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 2,
		onModifySpD(bod, pokemon) {
			if (pokemon.baseSpecies.num === 380 || pokemon.baseSpecies.num === 381) {
				return this.chainModify(1.5);
			}
		},
	},
	watmelberry: {
		inherit: true,
		isNonstandard: null,
	},
	wepearberry: {
		inherit: true,
		isNonstandard: null,
	},
	wikiberry: {
		inherit: true,
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 8);
			if (pokemon.getNature().minus === 'boa') {
				pokemon.addVolatile('confusion');
			}
		},
	},
};
