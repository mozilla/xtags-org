(function(window, document, undefined){

var monthNames = [],
	monthNamesShort = [], 
	dayNames = [],
	dayNamesShort = [], 
	UTC = Date.UTC,
	nameMap = {
			'YYYY':'FullYear', 
			'MMM': 'Month',
			'MM': 'Month', 
			'dd': 'Date',
			'hh': 'Hours',
			'mm': 'Minutes', 
			'period': 'Hours'
	}, 
	dateTimeColumns = {
		'date': ['YYYY','MM','dd'], 
		'time': ['hh','mm','period'],
		'datetime': ['YYYY','MM','dd','hh','mm','period']
	};
	
	function initNames(){
		var i = 0, 
			dParts = 0, 
			d = 0;
		for(i = 0; i < 12; i++){
			d = new Date(1970, i, 1);
			dParts = d.toString().split(" ");
			monthNamesShort.push(dParts[1]);
			dParts = d.toLocaleString().split(" ");			
			monthNames.push(dParts[1].substr(1,dParts[1].length-3));
		}
		for(i = 1; i <= 7; i++){
			d = new Date(1970, 1, i);
			dParts = d.toString().split(" ");
			dayNamesShort.push(dParts[0]);
			dParts = d.toLocaleDateString().split(" ");
			dayNames.push(dParts[0]);
		}
	};
	initNames();

	function getDaysInMonth(year, month) {
		return 32 - new Date(UTC(year, month, 32)).getUTCDate();
	};

	function getTimeKey(value, name){
		switch(name){
			case 'MMM':
				return monthNames[value];
			case 'MM':
				return monthNamesShort[value];	
			case 'mm':
				return value < 10 ? '0' + value : value;
			case 'hh':
				value = value >= 12 ? value - 12 : value;
				return value == 0 ? 12 : value;
			case 'YYYY':
			case 'dd':
				return value;
			case 'period':
				return value > 12 ? "PM" : "AM";
		}
	};

	function getTimeValue(time, part, adjustment){
		// map between date formats and get/set Date() function names
		var fn = nameMap[part];
		
		if (!adjustment || adjustment == 0) return time['get'+ fn]();
		
		if (part == 'dd'){
				var day = time['get'+fn]() + adjustment;
				var days = getDaysInMonth(time.getFullYear(), time.getMonth());
				return day > days ? 1 : day < 1 ? days : day;
		} else {
			var t = new Date();
			return new Date(t['set'+fn](time['get'+fn]() + adjustment))['get'+fn]();	
		}
	}

	function refreshElements(){
		var time = this.currentTime;
		this.xtag.list.innerHTML = '';
		this.columns.forEach(function(column){
			var colElem = document.createElement('div');
			colElem.setAttribute('data-type', column);
			for(var i = -1; i <= 1; i++){
				var elem = document.createElement('div');
				if (column == 'period'){
					if (i != 0) continue;					
					elem.setAttribute('data-value', "PM");
					colElem.appendChild(elem);

					var period = document.createElement('div');					
					period.setAttribute('data-value', "AM");
					colElem.appendChild(period);

					if (getTimeValue(time, column, 0) >= 12){
						elem.setAttribute('selected', null);
					} else {
						period.setAttribute('selected', null);
					}
				} else {
					var v = getTimeValue(time, column, i);
					elem.innerHTML = getTimeKey(v, column);
					elem.setAttribute('data-value', v);
					if (i == 0) elem.setAttribute('selected', null);
				}				
				colElem.appendChild(elem);
			}
			this.xtag.list.appendChild(colElem);
		}, this);
		xtag.fireEvent(this, 'changed', { value: this.value });
	}

	function setAndRefresh(elem, datePart, shift){
		var value = getTimeValue(elem.currentTime, datePart, shift);
		if (datePart == "MM" || datePart == "MMM"){
			var temp = new Date(elem.currentTime.getFullYear(), elem.currentTime.getMonth());
			temp.setMonth(value);
			var day = getTimeValue(elem.currentTime, "dd", 0);
			var days = getDaysInMonth(temp.getFullYear(), temp.getMonth());
			if (day > days){
				elem.currentTime.setDate(days);
			}
		}
		elem.currentTime['set' + nameMap[datePart]](value);
		elem.value = elem.currentTime.getTime();
		refreshElements.call(elem);
	}


	xtag.register('x-date-time-picker', {
		onCreate: function(){
			this.currentTime = this.startTime;
			this.innerHTML = '<input type="hidden" /><div class="x-date-time-picker-list"></div>';
			this.xtag.input = xtag.query(this, 'input')[0];
			this.xtag.input.value = this.currentTime.getTime();
			this.xtag.list = xtag.query(this, '.x-date-time-picker-list')[0];
			refreshElements.call(this);
		},
		events:{
			'click:touch:delegate(.x-date-time-picker-list > div > div:first-child)': function(e, elem){
				if (this.hasAttribute('selected')) return;
				var datePart = this.parentNode.getAttribute('data-type');
				if (datePart == 'period') setAndRefresh(elem, 'hh', 12); 
				else setAndRefresh(elem, datePart, -1);
			}, 
			'click:touch:delegate(.x-date-time-picker-list > div > div:last-child)': function(e, elem){
				if (this.hasAttribute('selected')) return;
				var datePart = this.parentNode.getAttribute('data-type'); 
				if (datePart == 'period') setAndRefresh(elem, 'hh', 12); 
				else setAndRefresh(elem, datePart, 1);
			}
		},
		getters: {
			columns: function(){
				if (dateTimeColumns[this.type]) return dateTimeColumns[this.type];
				var units = this.getAttribute('data-columns').split('|');				
				return units[0] ? units : [];
			}, 
			startTime: function(){
				var startAttr = this.getAttribute('data-start-time');
				var startTime = new Date();
				if (startAttr){
					try {
						startTime = new Date(Date.parse(startAttr) + new Date().getTimezoneOffset() * 60 * 1000);
					} catch(e) {}
				}
				return startTime;
			},
			'type': function(){
				return this.getAttribute('data-type');				
			},
			value: function(){
				return new Date(parseInt(this.xtag.input.value)).getTime();
			}, 
			name: function(){
				return this.xtag.input.getAttribute('name');
			}
		},
		setters: {
			'startTime': function(value){
				try {
					var start = new Date(Date.parse(value.toString()));
				} catch(e) {}
				if (start) {
					this.setAttibute('data-start-time', start.toLocaleString());
					refreshElements.call(this);
				}
			},
			value: function(value){
				var value = parseInt(value);
				if (value.toString() != 'NaN') this.xtag.input.setAttribute('value', value);
			}, 
			'name:attribute(name)': function(value){
				this.xtag.input.setAttribute('name', value);
			}
		}
	});
	
})(window, window.document);