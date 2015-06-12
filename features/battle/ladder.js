
exports.reportsRoom = false;

exports.reportBattle = function (room) {
	if (exports.reportsRoom) Bot.say(exports.reportsRoom, Config.clientUrl + room);
	exports.reportsRoom = false;
};

exports.laddering = false;
exports.ladderTimer = null;

exports.start = function (format) {
	if (!format) return false;
	if (exports.laddering) return false;
	format = toId(format);
	var check = function () {
		for (var i in Features['battle'].BattleBot.data) {
			if (Features['battle'].BattleBot.data[i].tier && toId(Features['battle'].BattleBot.data[i].tier) === format && Features['battle'].BattleBot.data[i].rated) return;
		}
		var cmds = [];
		var team = Features['battle'].TeamBuilder.getTeam(format);
		if (team) cmds.push('|/useteam ' + team);
		cmds.push('|/search ' + format);
		Bot.send(cmds);
	};
	exports.laddering = true;
	exports.ladderTimer = setInterval(check, 10 * 1000);
	check();
	return true;
};

exports.stop = function () {
	if (!exports.laddering) return false;
	exports.laddering = false;
	if (exports.ladderTimer) clearTimeout(exports.ladderTimer);
	exports.ladderTimer = null;
	return true;
};
