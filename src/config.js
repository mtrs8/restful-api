global.SALT_KEY='cluster0-shard-00-00.h817x'
global.EMAIL_TMPL='<h3>Olá, <strong>{0}</strong>, seja bem vindo a Node Store!!</h3>'

key1='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'
key2= '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'

module.exports={
    connectionString:'mongodb://user:user1234@cluster0-shard-00-00.h817x.mongodb.net:27017,cluster0-shard-00-01.h817x.mongodb.net:27017,cluster0-shard-00-02.h817x.mongodb.net:27017/API_NODE?ssl=true&replicaSet=atlas-12qe8o-shard-0&authSource=admin&retryWrites=true&w=majority',
    sendgridKey: key1,
    API_key: '3f2d2d824d405ad07ba592b415a4da70-cb3791c4-33eb6733',
    containerConnectionString: 'API_NODE'
}