class AutoUpdate {
	
	constructor(calls, sales, warranties, twcalls, twsales, twwarranties) {
		this.callsContainer = calls;
		this.salesContainer = sales;
		this.warrantiesContainer = warranties;

		this.callsToday = calls.children[0];
		this.callsLastWeek = calls.children[1];
		this.salesToday = sales.children[0];
		this.salesLastWeek = sales.children[1];
		this.warrantiesToday = warranties.children[0];
		this.warrantiesLastWeek = warranties.children[1];

		this.callsThisWeek = twcalls.children[0];
		this.salesThisWeek = twsales.children[0];
		this.warrantiesThisWeek = twwarranties.children[0];
	}

	updateIndividualStats() {

		var random = Math.floor(Math.random() * 2500) + 1;

		setTimeout(function() {

			var ct = Number(this.callsToday.innerHTML) + 1;
			this.callsToday.innerHTML = ct;
			this.callsThisWeek.innerHTML = Number(this.callsThisWeek.innerHTML) + 1;

			var sale = Math.floor(Math.random() * 10) + 1;
			var st = Number(this.salesToday.innerHTML)
			if(sale > 5) {
				
				var sold = Math.floor(Math.random() * 3) + 1;
				st += sold;
				this.salesToday.innerHTML = st;
				this.salesThisWeek.innerHTML = Number(this.salesThisWeek.innerHTML) + sold;

				var warrantiesSold = Math.floor(Math.random() * 20) + 1;
				var ws = Number(this.warrantiesToday.innerHTML);
				if(warrantiesSold > 15) {
					var wSold = Math.floor(Math.random() * 3) + 1
					ws += wSold; 
					this.warrantiesToday.innerHTML = ws;
					this.warrantiesThisWeek.innerHTML = Number(this.warrantiesThisWeek.innerHTML) + wSold;
				}
			}			

			this.updateIndividualStats();


		}.bind(this), random);

	}

}

export default AutoUpdate;