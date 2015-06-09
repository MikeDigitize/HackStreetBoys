class AutoUpdate {
	
	constructor(calls, sales, warranties, twcalls, twsales, twwarranties, dashboard) {
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
		this.currentIndividualPos = 1;
		this.currentTeamPos = 2;
		this.dashboard = dashboard;
	}

	updateIndividualStats() {

		let random = Math.floor(Math.random() * 5000) + 1;	
		let positions = ["1st", "2nd", "3rd", "4th", "5th"];
		let position = document.querySelector("#individualRank span");

		setTimeout(function() {
	
			let ct = Number(this.callsToday.innerHTML) + 1;
			this.callsToday.innerHTML = ct;
			this.callsThisWeek.innerHTML = Number(this.callsThisWeek.innerHTML) + 1;
			this.dashboard.updateBoxState(ct, Number(this.callsLastWeek.innerHTML), this.callsLastWeek.parentNode);

			let sale = Math.floor(Math.random() * 10) + 1;
			let st = Number(this.salesToday.innerHTML);	

			if(sale > 6) {
				
				let sold = 1;
				st += sold;
				this.dashboard.updateBoxState(st, Number(this.salesLastWeek.innerHTML), this.salesLastWeek.parentNode);

				this.salesToday.innerHTML = st;
				this.salesThisWeek.innerHTML = Number(this.salesThisWeek.innerHTML) + sold;

				let warrantiesSold = Math.floor(Math.random() * 20) + 1;
				let ws = Number(this.warrantiesToday.innerHTML);
				if(warrantiesSold > 15) {
					let wSold = 1
					ws += wSold; 
					this.warrantiesToday.innerHTML = ws;
					this.warrantiesThisWeek.innerHTML = Number(this.warrantiesThisWeek.innerHTML) + wSold;	
					this.dashboard.updateBoxState(ws, Number(this.warrantiesLastWeek.innerHTML), this.warrantiesLastWeek.parentNode);

					var increasePosition = Math.floor(Math.random() * 10) + 1;
					if(increasePosition > 5) {						
						if(this.currentIndividualPos > 0) {
							this.currentIndividualPos--;
							position.innerHTML = positions[this.currentIndividualPos];							
						}
					} 

				}
		
			}		
			else {
				var decreasePosition = Math.floor(Math.random() * 10) + 1;
				if(decreasePosition > 5) {
					if(this.currentIndividualPos < positions.length - 1) {					
						this.currentIndividualPos++;
						position.innerHTML = positions[this.currentIndividualPos];
						
					}
				} 
			}			

			this.updateIndividualStats();


		}.bind(this), random);

	}

	updateTeamStats() {

		let random = Math.floor(Math.random() * 1500) + 1;	
		let positions = ["1st", "2nd", "3rd", "4th", "5th"];
		let position = document.querySelector("#teamRank span");

		setTimeout(function() {
	
			let ct = Number(this.callsToday.innerHTML) + 1;
			this.callsToday.innerHTML = ct;
			this.callsThisWeek.innerHTML = Number(this.callsThisWeek.innerHTML) + 1;
			this.dashboard.updateBoxState(ct, Number(this.callsLastWeek.innerHTML), this.callsLastWeek.parentNode);

			let sale = Math.floor(Math.random() * 10) + 1;
			let st = Number(this.salesToday.innerHTML);	

			if(sale > 6) {
				
				let sold = 1;
				st += sold;
				this.dashboard.updateBoxState(st, Number(this.salesLastWeek.innerHTML), this.salesLastWeek.parentNode);

				this.salesToday.innerHTML = st;
				this.salesThisWeek.innerHTML = Number(this.salesThisWeek.innerHTML) + sold;

				let warrantiesSold = Math.floor(Math.random() * 20) + 1;
				let ws = Number(this.warrantiesToday.innerHTML);
				if(warrantiesSold > 15) {
					let wSold = 1
					ws += wSold; 
					this.warrantiesToday.innerHTML = ws;
					this.warrantiesThisWeek.innerHTML = Number(this.warrantiesThisWeek.innerHTML) + wSold;	
					this.dashboard.updateBoxState(ws, Number(this.warrantiesLastWeek.innerHTML), this.warrantiesLastWeek.parentNode);
					console.log("increase team position?");
					var increasePosition = Math.floor(Math.random() * 10) + 1;
					if(increasePosition > 5) {						
						if(this.currentTeamPos > 0) {
							this.currentTeamPos--;
							position.innerHTML = positions[this.currentTeamPos];	
							console.log("increase team position");						
						}
					} 

				}
		
			}		
			else {
				console.log("decrease team position??");
				var decreasePosition = Math.floor(Math.random() * 10) + 1;
				if(decreasePosition > 5) {
					if(this.currentTeamPos < positions.length - 1) {					
						this.currentTeamPos++;
						position.innerHTML = positions[this.currentTeamPos];
						console.log("decrease team position");
						
					}
				} 
			}			

			this.updateIndividualStats();


		}.bind(this), random);

	}

}

export default AutoUpdate;