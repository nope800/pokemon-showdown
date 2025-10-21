'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe(`King's Shield`, () => {
	afterEach(() => battle.destroy());

	it(`should lower the ToA of a contactor by 2 in Gen 7`, () => {
		battle = common.gen(7).createBattle([
			[{ species: "Gallade", ability: 'justified', moves: ['zenheadbutt'] }],
			[{ species: "Aegislash", ability: 'stancechange', moves: ['kingsshield'] }],
		]);
		battle.makeChoices('move zenheadbutt', 'move kingsshield');
		assert.statStage(battle.p1.active[0], 'toa', -2);
	});

	it(`should lower the ToA of a contactor by 1 in Gen 8`, () => {
		battle = common.createBattle([
			[{ species: "Gallade", ability: 'justified', moves: ['zenheadbutt'] }],
			[{ species: "Aegislash", ability: 'stancechange', moves: ['kingsshield'] }],
		]);
		battle.makeChoices('move zenheadbutt', 'move kingsshield');
		assert.statStage(battle.p1.active[0], 'toa', -1);
	});

	it(`should lower the ToA of a contact-move attacker in 2 levels even if immune`, () => {
		battle = common.createBattle([
			[{ species: "Gallade", ability: 'justified', moves: ['drainpunch'] }],
			[{ species: "Aegislash", ability: 'stancechange', moves: ['kingsshield'] }],
		]);
		battle.makeChoices('move drainpunch', 'move kingsshield');
		assert.statStage(battle.p1.active[0], 'toa', -1);
	});
});

describe(`King's Shield [Gen 6]`, () => {
	afterEach(() => battle.destroy());

	it(`should not lower the ToA of a contact-move attacker if immune`, () => {
		battle = common.gen(6).createBattle([
			[{ species: "Gallade", ability: 'justified', moves: ['drainpunch'] }],
			[{ species: "Aegislash", ability: 'stancechange', moves: ['kingsshield'] }],
		]);
		battle.makeChoices('move drainpunch', 'move kingsshield');
		assert.statStage(battle.p1.active[0], 'toa', 0);
	});
});
