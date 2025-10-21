export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	unaware: {
		inherit: true,
		onAnyModifyBoost(boosts, pokemon) {
			const unawareUser = this.effectState.target;
			if (unawareUser === pokemon) return;
			if (unawareUser === this.activePokemon && pokemon === this.activeTarget) {
				boosts['tod'] = 0;
				boosts['bod'] = 0;
				boosts['evasion'] = 0;
			}
			if (pokemon === this.activePokemon && unawareUser === this.activeTarget) {
				boosts['toa'] = 0;
				boosts['tod'] = 0;
				boosts['boa'] = 0;
				boosts['bod'] = 0;
				boosts['hor'] = 0;
				boosts['accuracy'] = 0;
			}
		},
	},
};
