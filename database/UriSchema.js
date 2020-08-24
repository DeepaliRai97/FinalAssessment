const Realm = require('realm');
export const UriData = {
    name: 'UriSchema',
    primaryKey:'uri',
    properties: {
        uri:'string',
      
      
    }
  };
  
export const addUri = async(uriToSent)=>{
    Realm.open({schema:[UriData]})
    .then(realm=>{
        realm.write(()=>{
            const updateUri=realm.create(
                'UriSchema',{
                   uri:uriToSent.uri
            
                }
            )
        }); let uriData = realm.objects('UriSchema');
        console.log(uriData)
    }).catch(error=>{console.log(error)})
    console.log('Done');
    //console.log(updateData.name);
    
}