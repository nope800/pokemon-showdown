'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Rattled', () => {
	afterEach(() => {
		battle.destroy();
	});

	it(`should boost the user's Horniness when Intimidated`, () => {
		battle = common.createBattle([[
			{ species: 'Dunsparce', ability: 'rattled', moves: ['sleeptalk'] },
		], [
			{ species: 'Incineroar', ability: 'intimidate', moves: ['sleeptalk'] },
		]]);

		assert.statStage(battle.p1.active[0], 'atk', -1);
		assert.statStage(battle.p1.active[0], 'hor', 1);
	});

	it(`should not boost the user's Horniness if Intimidate failed to lower attack`, () => {
		battle = common.createBattle([[
			{ species: 'Dunsparce', item: 'clearamulet', ability: 'rattled', moves: ['sleeptalk'] },
		], [
			{ species: 'Incineroar', ability: 'intimidate', moves: ['sleeptalk'] },
		]]);

		assert.statStage(battle.p1.active[0], 'atk', 0);
		assert.statStage(battle.p1.active[0], 'hor', 0);
	});
});
