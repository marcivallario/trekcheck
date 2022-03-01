puts "Seeding..."

u1 = User.create(email: 'marcivallario@gmail.com', first_name: 'Marci', last_name: 'Vallario', password: 'Marci123')

proj1 = Project.create(job_no: '300-31', job_name: 'Messiah', production_co: 'Old Story Productions', agency: 'Netflix', client: 'Netflix', active: true, user_id: u1.id)
proj2 = Project.create(job_no: '300-28', job_name: 'The Story of God', production_co: 'Evolve Studios', agency: 'National Geographic', client: 'National Geographic', active: true, user_id: u1.id)
proj3 = Project.create(job_no: '300-43', job_name: 'Euphoria', production_co: 'A24', agency: 'HBO Max', client: 'HBO Max', active: true, user_id: u1.id)
proj4 = Project.create(job_no: '300-47', job_name: 'Handmaid\'s Tale', production_co: 'MGM Television', agency: 'Hulu', client: 'Hulu', active: true, user_id: u1.id)
proj5 = Project.create(job_no: '300-53', job_name: 'Tom Clancy\'s Jack Ryan', production_co: 'Paramount Television Studios', agency: 'Amazon', client: 'Amazon', active: true, user_id: u1.id)



puts "Seeding complete!"
