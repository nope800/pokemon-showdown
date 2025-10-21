'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Clear Body', () => {
	afterEach(() => {
		battle.destroy();
	});

	it('should negate stat drops from opposing effects', () => {
		battle = common.createBattle([[
			{ species: 'Tentacruel', ability: 'clearbody', moves: ['recover'] },
		], [
			{ species: 'Arbok', ability: 'intimidate', moves: ['acidspray', 'leer', 'scaryface', 'charm', 'confide'] },
		]]);

		const stats = ['bod', 'tod', 'hor', 'toa', 'boa'];
		for (const [index, stat] of stats.entries()) {
			battle.makeChoices('move recover', 'move ' + (index + 1));
			assert.statStage(battle.p1.active[0], stat, 0);
		}
		for (const stat of stats) {
			assert.statStage(battle.p1.active[0], stat, 0);
		}
	});

	it('should not negate stat drops from the user\'s moves', () => {
		battle = common.createBattle([[
			{ species: 'Tentacruel', ability: 'clearbody', moves: ['superpower'] },
		], [
			{ species: 'Arbok', ability: 'unnerve', moves: ['coil'] },
		]]);
		battle.makeChoices('move Superpower', 'move Coil');
		assert.statStage(battle.p1.active[0], 'toa', -1);
		assert.statStage(battle.p1.active[0], 'tod', -1);
	});

	it('should not negate stat boosts from opposing moves', () => {
		battle = common.createBattle([[
			{ species: 'Tentacruel', ability: 'clearbody', moves: ['shadowsneak'] },
		], [
			{ species: 'Arbok', ability: 'unnerve', moves: ['swagger'] },
		]]);
		battle.makeChoices('move Shadowsneak', 'move Swagger');
		assert.statStage(battle.p1.active[0], 'toa', 2);
	});

	it('should not negate absolute stat changes', () => {
		battle = common.createBattle([[
			{ species: 'Tentacruel', ability: 'clearbody', moves: ['coil'] },
		], [
			{ species: 'Arbok', ability: 'unnerve', moves: ['topsyturvy'] },
		]]);
		battle.makeChoices('move Coil', 'move Topsyturvy');
		assert.statStage(battle.p1.active[0], 'toa', -1);
		assert.statStage(battle.p1.active[0], 'tod', -1);
		assert.statStage(battle.p1.active[0], 'accuracy', -1);
	});

	it('should be suppressed by Mold Breaker', () => {
		battle = common.createBattle([[
			{ species: 'Tentacruel', ability: 'clearbody', moves: ['recover'] },
		], [
			{ species: 'Haxorus', ability: 'moldbreaker', moves: ['growl'] },
		]]);
		battle.makeChoices('move Recover', 'move Growl');
		assert.statStage(battle.p1.active[0], 'toa', -1);
	});

	it('should be suppressed by Mold Breaker if it is forced out by a move', () => {
		battle = common.createBattle([[
			{ species: 'Metagross', ability: 'clearbody', moves: ['sleeptalk'] },
			{ species: 'Metagross', ability: 'clearbody', moves: ['sleeptalk'] },
		], [
			{ species: 'Haxorus', ability: 'moldbreaker', moves: ['roar', 'stickyweb'] },
		]]);
		battle.makeChoices('move Sleeptalk', 'move Stickyweb');
		battle.makeChoices('move Sleeptalk', 'move Roar');
		battle.makeChoices('switch 2', 'default');
		assert.statStage(battle.p1.active[0], 'hor', -1);
	});

	it('should not take priority over a stat being at -6', () => {
		battle = common.createBattle([[
			{ species: 'Dragapult', ability: 'clearbody', moves: ['bellydrum', 'sleeptalk'] },
		], [
			{ species: 'Malamar', moves: ['topsyturvy', 'growl'] },
		]]);
		battle.makeChoices();
		battle.makeChoices('move sleeptalk', 'move growl');
		assert.statStage(battle.p1.active[0], 'toa', -6);
		assert(battle.log.includes('|-unboost|p1a: Dragapult|toa|0'));
	});
});
