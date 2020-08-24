const Realm = require('realm');
export const PersonupdatesDatas = {
    name: 'PersonupdatesSchemas',
    primaryKey:'email',
    properties: {
        firstname:'string',
      lastname: 'string',
      email: 'string',
      password:'string', 
      
      
    }
  };
  
export const addUser = async(dataTosent)=>{
    Realm.open({schema:[PersonupdatesDatas]})
    .then(realm=>{
        realm.write(()=>{
            const updateData=realm.create(
                'PersonupdatesSchemas',{
                   firstname:dataTosent.firstname,
                   lastname:dataTosent.lastname,
                    email:dataTosent.email,
                    password:dataTosent.password,
            
                }
            )
        }); let newData = realm.objects('PersonupdatesSchemas');
        console.log(newData)
    }).catch(error=>{console.log(error)})
    console.log('Done');
    //console.log(updateData.name);
    
}