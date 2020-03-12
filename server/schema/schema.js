const graphql=require("graphql");

const {GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID} =graphql;

const _ = require("lodash");

//dummy data
var books=[
    {name:'hello world',genre:'code',id:'1'},
    {name:'hello world 2',genre:'code 2',id:'2'},
    {name:'hello world 3',genre:'code 3',id:'3'}
];

const BookType=new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString}
    })
});

const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                //args contient donc id
                //code to get data from db / other source
                return _.find(books,{id:args.id});
            }
        }
    }
});


module.exports=new GraphQLSchema({
    query:RootQuery
});