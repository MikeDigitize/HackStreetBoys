import AutoUpdate from "./auto-update-dash";

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
	    this.callsToday.children[1].innerHTML = /*data.call.lastWeekDay*/ 7;
	    this.updateBoxState(data.call.today, 7, this.callsToday);   	    

	    this.salesToday.children[0].innerHTML = data.sale.today;
	    this.salesToday.children[1].innerHTML = /*data.sale.lastWeekDay*/ 12;
	    this.updateBoxState(data.sale.today, 12, this.salesToday);    

	    this.warrantiesToday.children[0].innerHTML = data.warrenty.today;
	    this.warrantiesToday.children[1].innerHTML = /*data.warrenty.lastWeekDay*/ 4;
	    this.updateBoxState(data.warrenty.today, 4, this.warrantiesToday); 

	    this.callsLastWeek.children[0].innerHTML = data.call.wow;
	    this.callsLastWeek.children[1].innerHTML = /*data.call.lastWeekWow*/ 243;
	    this.updateBoxState(data.call.wow, 243, this.callsLastWeek);     
	    
	    this.salesLastWeek.children[0].innerHTML = data.sale.wow;
	    this.salesLastWeek.children[1].innerHTML = /*data.sale.lastWeekWow*/ 33;
	    this.updateBoxState(data.sale.wow, 33, this.salesLastWeek);    

	    this.warrantiesLastWeek.children[0].innerHTML = data.warrenty.wow;
	    this.warrantiesLastWeek.children[1].innerHTML = /*data.warrenty.lastWeekWow*/ 11;
	    this.updateBoxState(data.warrenty.wow, 11, this.warrantiesLastWeek);   

	    let update = new AutoUpdate(this.callsToday, 
	    	this.salesToday, 
	    	this.warrantiesToday,
	    	this.callsLastWeek,
	    	this.salesLastWeek,
	    	this.warrantiesLastWeek, this);
	    
	    update.updateIndividualStats(); 

	}

	updateTeam(data) {

		this.teamCallsToday.children[0].innerHTML = data.call.today;
	    this.teamCallsToday.children[1].innerHTML = 21;
	    this.updateBoxState(data.call.today, 21, this.teamCallsToday);   	    

	    this.teamSalesToday.children[0].innerHTML = data.sale.today;
	    this.teamSalesToday.children[1].innerHTML = 31;
	    this.updateBoxState(data.sale.today, 31, this.teamSalesToday);    

	    this.teamWarrantiesToday.children[0].innerHTML = data.warrenty.today;
	    this.teamWarrantiesToday.children[1].innerHTML = 19;
	    this.updateBoxState(data.warrenty.today, 19, this.teamWarrantiesToday); 

	    this.teamCallsLastWeek.children[0].innerHTML = data.call.wow;
	    this.teamCallsLastWeek.children[1].innerHTML = 178;
	    this.updateBoxState(data.call.wow, 178, this.teamCallsLastWeek);     
	    
	    this.teamSalesLastWeek.children[0].innerHTML = data.sale.wow;
	    this.teamSalesLastWeek.children[1].innerHTML = 121;
	    this.updateBoxState(data.sale.wow, 121, this.teamSalesLastWeek);    

	    this.teamWarrantiesLastWeek.children[0].innerHTML = data.warrenty.wow;
	    this.teamWarrantiesLastWeek.children[1].innerHTML = 44;
	    this.updateBoxState(data.warrenty.wow, 44, this.teamWarrantiesLastWeek); 

	    let updateTeam = new AutoUpdate(this.teamCallsToday, 
	    	this.teamSalesToday, 
	    	this.teamWarrantiesToday,
	    	this.teamCallsLastWeek,
	    	this.teamSalesLastWeek,
	    	this.teamWarrantiesLastWeek, this);
	    
	    updateTeam.updateTeamStats(); 

	}

	setName(name) {
		this.name.innerHTML = name;
	}

	updateBoxState(now, previous, container) {		
		
		if(now < previous) {
	        container.classList.add("red");
	        container.classList.remove("green");
	    }
	    else {
	        container.classList.add("green"); 
	        container.classList.remove("red");
	    }
	}

}

export default UpdateDashboard;
