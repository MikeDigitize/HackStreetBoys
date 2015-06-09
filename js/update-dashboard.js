class UpdateDashboard {
	
	constructor() {
		this.name = document.querySelector(".playerName");
		this.callsToday = document.querySelector("#callsToday");   
	    this.salesToday = document.querySelector("#salesToday");
	    this.warrantiesToday = document.querySelector("#warrantiesToday");
	    this.callsLastWeek = document.querySelector("#callsLastWeek");   
	    this.salesLastWeek = document.querySelector("#salesLastWeek");
	    this.warrantiesLastWeek = document.querySelector("#warrantiesLastWeek");

	    this.teamCallsToday = document.querySelector("#teamCallsToday"); 
	    this.teamSalesToday = document.querySelector("#teamSalesToday");
	    this.teamWarrantiesToday = document.querySelector("#teamWarrantiesToday");
	    this.teamCallsLastWeek = document.querySelector("#teamCallsLastWeek");   
	    this.teamSalesLastWeek = document.querySelector("#teamSalesLastWeek");
	    this.teamWarrantiesLastWeek = document.querySelector("#teamWarrantiesLastWeek");
	}

	updateStaff(data) { 
		
		this.callsToday.children[0].innerHTML = data.call.today;
	    this.callsToday.children[1].innerHTML = data.call.lastWeekDay;
	    this.updateBoxState(data.call.today, data.call.lastWeekDay, this.callsToday);   	    

	    this.salesToday.children[0].innerHTML = data.sale.today;
	    this.salesToday.children[1].innerHTML = data.sale.lastWeekDay;
	    this.updateBoxState(data.sale.today, data.sale.lastWeekDay, this.salesToday);    

	    this.warrantiesToday.children[0].innerHTML = data.warrenty.today;
	    this.warrantiesToday.children[1].innerHTML = data.warrenty.lastWeekDay;
	    this.updateBoxState(data.warrenty.today, data.warrenty.lastWeekDay, this.warrantiesToday); 

	    this.callsLastWeek.children[0].innerHTML = data.call.wow;
	    this.callsLastWeek.children[1].innerHTML = data.call.lastWeekWow;
	    this.updateBoxState(data.call.wow, data.call.lastWeekWow, this.callsLastWeek);     
	    
	    this.salesLastWeek.children[0].innerHTML = data.sale.wow;
	    this.salesLastWeek.children[1].innerHTML = data.sale.lastWeekWow;
	    this.updateBoxState(data.sale.wow, data.sale.lastWeekWow, this.salesLastWeek);    

	    this.warrantiesLastWeek.children[0].innerHTML = data.warrenty.wow;
	    this.warrantiesLastWeek.children[1].innerHTML = data.warrenty.lastWeekWow;
	    this.updateBoxState(data.warrenty.wow, data.warrenty.lastWeekWow, this.warrantiesLastWeek);    

	}

	updateTeam(data) {

		this.teamCallsToday.children[0].innerHTML = data.call.today;
	    this.teamCallsToday.children[1].innerHTML = data.call.lastWeekDay;
	    this.updateBoxState(data.call.today, data.call.lastWeekDay, this.teamCallsToday);   	    

	    this.teamSalesToday.children[0].innerHTML = data.sale.today;
	    this.teamSalesToday.children[1].innerHTML = data.sale.lastWeekDay;
	    this.updateBoxState(data.sale.today, data.sale.lastWeekDay, this.teamSalesToday);    

	    this.teamWarrantiesToday.children[0].innerHTML = data.warrenty.today;
	    this.teamWarrantiesToday.children[1].innerHTML = data.warrenty.lastWeekDay;
	    this.updateBoxState(data.warrenty.today, data.warrenty.lastWeekDay, this.teamWarrantiesToday); 

	    this.teamCallsLastWeek.children[0].innerHTML = data.call.wow;
	    this.teamCallsLastWeek.children[1].innerHTML = data.call.lastWeekWow;
	    this.updateBoxState(data.call.wow, data.call.lastWeekWow, this.teamCallsLastWeek);     
	    
	    this.teamSalesLastWeek.children[0].innerHTML = data.sale.wow;
	    this.teamSalesLastWeek.children[1].innerHTML = data.sale.lastWeekWow;
	    this.updateBoxState(data.sale.wow, data.sale.lastWeekWow, this.teamSalesLastWeek);    

	    this.teamWarrantiesLastWeek.children[0].innerHTML = data.warrenty.wow;
	    this.teamWarrantiesLastWeek.children[1].innerHTML = data.warrenty.lastWeekWow;
	    this.updateBoxState(data.warrenty.wow, data.warrenty.lastWeekWow, this.teamWarrantiesLastWeek); 

	}

	setName(name) {
		this.name.innerHTML = name;
	}

	updateBoxState(now, previous, container) {
		if(now < previous) {
	        container.classList.add("red");
	    }
	    else {
	        container.classList.add("green"); 
	    }
	}

}

export default UpdateDashboard;
