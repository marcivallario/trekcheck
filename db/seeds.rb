puts "Seeding..."

u1 = User.create!(email: 'marcivallario@gmail.com', first_name: 'Marci', last_name: 'Vallario', password: 'Marci123')
u2 = User.create!(email: 'spidey@spiderman.org', first_name: 'Peter', last_name: 'Parker', password: 'Peter123')

proj1 = Project.create!(job_no: '300-31', job_name: 'Messiah', production_co: 'Old Story Productions', agency: 'Netflix', client: 'Netflix', active: true, user_id: u1.id)
proj2 = Project.create!(job_no: '300-28', job_name: 'The Story of God', production_co: 'Evolve Studios', agency: 'National Geographic', client: 'National Geographic', active: true, user_id: u1.id)
proj3 = Project.create!(job_no: '300-43', job_name: 'Euphoria', production_co: 'A24', agency: 'HBO Max', client: 'HBO Max', active: true, user_id: u1.id)
proj4 = Project.create!(job_no: '300-47', job_name: 'Handmaid\'s Tale', production_co: 'MGM Television', agency: 'Hulu', client: 'Hulu', active: true, user_id: u1.id)
proj5 = Project.create!(job_no: '300-53', job_name: 'Tom Clancy\'s Jack Ryan', production_co: 'Paramount Television Studios', agency: 'Amazon', client: 'Amazon', active: true, user_id: u1.id)

pass1 = Passenger.create!(user_id: u1.id, legal_first_name: "John", legal_last_name: "Brown", nickname: "JJ", position: "BB Electric", department: "G&E", cell: "(407) 443-1818", email: "jbrown68@gmail.com", dob: "01/24/1980", country_of_residence: "USA", state_of_residence: "CA", passport: "4736549543", license: "VA3445-23445-33", tsa_precheck: "TT484736458", global_entry: "583939903", seat_assignment_pref: "Window")

pass2 = Passenger.create!(user_id: u1.id, legal_first_name: "Jane", legal_last_name: "Doe", position: "Craft Services", department: "Production", cell: "(407) 441-5749", email: "janie.doe@gmail.com", dob: "01/02/1993", country_of_residence: "USA", state_of_residence: "CA", passport: "4736549543", license: "VA3445-23445-33", tsa_precheck: "TT484736458", global_entry: "583939903", seat_assignment_pref: "Aisle")

pass3 = Passenger.create!(user_id: u1.id, legal_first_name: "Jack", legal_last_name: "Smith", position: "Production Assistant", department: "Production", cell: "(407) 382-4737", email: "jack.the.ripper@gmail.com", dob: "08/09/1990", country_of_residence: "USA", state_of_residence: "CA", passport: "4736549543", license: "VA3445-23445-33", tsa_precheck: "TT484736458", global_entry: "583939903", seat_assignment_pref: "Aisle")

trip1 = Trip.create!(depart: DateTime.new(2022, 3, 2), return: DateTime.new(2022, 3, 14), itinerary_sent: false, project_id: proj1.id, passenger_id: pass1.id)
trip2 = Trip.create!(depart: DateTime.new(2022, 3, 11), return: DateTime.new(2022, 3, 13), itinerary_sent: false, project_id: proj2.id, passenger_id: pass2.id)
trip3 = Trip.create!(depart: DateTime.new(2022, 3, 10), return: DateTime.new(2022, 3, 15), itinerary_sent: true, project_id: proj1.id, passenger_id: pass3.id)

flight3 = Flight.create(leg: 'return', airline: 'Southwest Airlines', flight_no: 'WN5840', dep_airport: 'LGA', dep_time: DateTime.new(2022,3,15,8,30), arr_airport: 'MCO', arr_time: DateTime.new(2022,3,15,15,35), seat: '3C', confirmation: '49HYY7', notes: 'One-Way, internet on board', trip_id: trip3.id)
flight1 = Flight.create(leg: 'outbound', airline: 'Delta Airlines', flight_no: 'DL3326', dep_airport: 'MCO', dep_time: DateTime.new(2022,3,10,8,50), arr_airport: 'LGA', arr_time: DateTime.new(2022,3,10,11,55), seat: '31A', confirmation: '34XJ8D', notes: 'One-Way, no internet on board', trip_id: trip3.id)
flight2 = Flight.create(leg: 'outbound', airline: 'Southwest Airlines', flight_no: 'WN5840', dep_airport: 'MCO', dep_time: DateTime.new(2022,3,11,8,30), arr_airport: 'LGA', arr_time: DateTime.new(2022,3,11,15,35), seat: '3C', confirmation: '49HYY7', notes: 'One-Way, internet on board', trip_id: trip2.id)
flight4 = Flight.create(leg: 'outbound', airline: 'Southwest Airlines', flight_no: 'WN5840', dep_airport: 'MCO', dep_time: DateTime.new(2022,3,4,4,30), arr_airport: 'LGA', arr_time: DateTime.new(2022,3,4,7,35), seat: '3C', confirmation: '49HYY7', notes: 'One-Way, internet on board', trip_id: trip1.id)

# transpo1 = Transportation.create(direction: 'From home to airport', date: DateTime.new(2022,3,4,4,30), method: 'Enterprise VIP Rent-A-Car', confirmation: '9283437824732', trip_id: trip1.id)

puts "Seeding complete!"
