import client from '../models/clientSchema.js'

//Create a new client
export const newClient = async (req,res) =>{
    const {
        Name: {
            FirstName,  
            SecondName
        },
        LastName: {
           FatherLastName,
           MotherLastName
        },
        PhoneNumber,
        Email,
        Location: {
            State,
            Municipality,
            ZIP,
            Address,
            Cologne,
            Locality,
            OutNumber,
            InNumber,
            Latitude,
            Length
        }
    } = req.body;
    
    try {
        const newClient = client({
            Name: {
                FirstName,  
                SecondName
            },
            LastName: {
               FatherLastName,
               MotherLastName
            },
            PhoneNumber,
            Email,
            Location: {
                State,
                Municipality,
                ZIP,
                Address,
                Cologne,
                Locality,
                OutNumber,
                InNumber,
                Latitude,
                Length
            }
        });
        
        await newClient.save();
        return res.status(201).json(newClient);
    } catch (error) {
        console.log(error);
        return res.status(500).json( {message: 'Error registering client' } );
    }
}

//View all clients
export const viewAllClient = async (req,res) =>{
    try {
        const allClients = await client.find();
        return res.status(200).json(allClients);
    } catch (error) {
        console.log(error);
        return res.status(500).json( {message: 'Error finding clients' } );   
    }
}

//View id Client
export const viewIdClient = async (req,res) =>{ 
    const { id } = req.params;
    
    try {
        const idClient = await client.findById(id);
        if(!idClient){
            return res.status(404).json({ message: 'Client does not exist yet' })
        } else {
            return res.status(200).json(idClient);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json( {message: 'Server error!'} );   
    }
}

//Editar el cliente
export const editClient = async (req,res) => {
    const { 
        PhoneNumber, FirstName, SecondName, FatherLastName,
        MotherLastName, Email, State, Municipality,
        ZIP, Address, Cologne, Number,
        Latitude, Length, PhoneNumberIndex
    } = req.body;

    const { id } = req.params;

    try {
        const idClient = await client.findById(id);

        if (!idClient) {
            return res.status(404).json({ message: 'Client does not exist yet' });
        } else {
            const UpdateQuery = { };

            const fields = { // Mapeo de los campos
                //PhoneNumber: (value) => { UpdateQuery['Pho neNumber'] = { $push: { PhoneNumber:value } } },
                FirstName: (value) => { UpdateQuery['Name.FirstName'] = value },  
                SecondName: (value) => { UpdateQuery['Name.SecondName'] = value },
                FatherLastName: (value) => { UpdateQuery['LastName.FatherLastName'] = value },
                MotherLastName: (value) => { UpdateQuery['LastName.MotherLastName'] = value },
                Email: (value) => { UpdateQuery['Email'] = value },
                State: (value) => { UpdateQuery['Location.State'] = value },
                Municipality: (value) => { UpdateQuery['Location.Municipality'] = value },
                ZIP: (value) => { UpdateQuery['Location.ZIP'] = value },
                Address: (value) => { UpdateQuery['Location.Address'] = value },
                Cologne: (value) => { UpdateQuery['Location.Cologne'] = value },
                Locality: (value) => { UpdateQuery['Location.Locality'] = value },
                OutNumber: (value) => { UpdateQuery['Location.OutNumber'] = value },
                InNumber: (value) => { UpdateQuery['Location.InNumber'] = value },
                Latitude: (value) => { UpdateQuery['Location.Latitude'] = value },
                Length: (value) => { UpdateQuery['Location.Length'] = value },
                PhoneNumber: (value) => {
                    if (PhoneNumberIndex !== undefined) {
                        UpdateQuery[`PhoneNumber.${PhoneNumberIndex}`] = value; // Modificar el elemento en un índice específico
                    } else {
                        UpdateQuery['PhoneNumber'] = { $push: { PhoneNumber: value } }; // Agregar un nuevo número
                    }
                }
            }

            for (const [key, updateFunction] of Object.entries(fields)) {
                if (req.body[key]){
                    await updateFunction(req.body[key]);
                }
            }

            const update = await client.findByIdAndUpdate(idClient,{ $set: UpdateQuery },{ new:true });
            return res.status(200).json(update)

            /*if(PhoneNumber) {
                UpdateQuery.$push = { PhoneNumber:{ $each:PhoneNumber} };
            }

            const updateClient = await client.findByIdAndUpdate(id,UpdateQuery,{ new:true });

            return res.status(200).json( updateClient );*/
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error!' });
    }
}