var items = [{u: "user1", p : "test123"}, {u: "user2", p: "test123"}];
module.exports = {
	exists: function (user, password) {
		if(!user || !password) {
			return false;
		}
		for(var i = 0, item = items[i]; i < items.length; i++){
				if(item.u == user && item.p == password) {
					return true;
				}
				return false;
		}
	}
}