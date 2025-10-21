'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe(`Cheek Pouch`, () => {
	afterEach(() => {
		battle.destroy();
	});

	it(`should restore 1/3 Stamina to the user after eating a Berry`, () => {
		battle = common.createBattle([[
			{ species: 'wynaut', item: 'lumberry', ability: 'cheekpouch', moves: ['sleeptalk'] },
		], [
			{ species: 'pichu', moves: ['nuzzle'] },
		]]);
		const wynaut = battle.p1.active[0];
		battle.makeChoices();
		assert.fullHP(wynaut);
	});

	it(`should not activate if the user was at full Stamina`, () => {
		battle = common.createBattle([[
			{ species: 'wynaut', item: 'lumberry', ability: 'cheekpouch', moves: ['sleeptalk'] },
		], [
			{ species: 'pichu', moves: ['glare'] },
		]]);
		battle.makeChoices();
		assert(battle.log.every(line => !line.startsWith('|-heal')));
	});
});
