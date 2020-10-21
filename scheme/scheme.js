import graphql, { GraphQLList } from 'graphql';
import database from '../database.js';

const {products, productGroup} = database;

const {GraphQLID, GraphQLString, GraphQLObjectType, GraphQLSchema} = graphql;

const productType = new GraphQLObjectType({
    name: 'product',
    fields: ()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        price: {type: GraphQLString},
        productGroup: {type: GraphQLID}
    })
});

const productGroupType = new GraphQLObjectType({
    name: 'ProductGroup',
    fields: ()=>({
        id: {ide: GraphQLID},
        name: {name: GraphQLString}
    })
});

const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        product: {
            type: productType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return products.find(p=> p.id === args.id);
            }
        },
        product:{
            type: new GraphQLList(productType),
            resolve(parent, args){
                return products;
            }
        },
        productGroups:{
            type: new GraphQLList(productGroupType),
            resolve(parent, args){
                return productGroup;
            }
        }
    }
});

const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProduct: {
            type: productType,
            args: {
                name: {type: GraphQLString},
                price: {type: GraphQLString},
                productGroupId: {type: GraphQLID}
            },
            resolve(parent, args){
                let product = new Product(args);
                //products.push(newProduct);

                return newProduct.save();
            }
        },
        editProduct: {
            type: ProductType,
            args:{
                id: {type: GraphQLID},
                name: {type: GraphQLString},
                price: {type: GraphQLString},
                productGroupId: {type: GraphQLID}
            },
            resolve(parent, args){
                const update = args;
                delete update.id;
                const product = Product.findOneAndUpdate({id: args.id}, update);
                return product;
            }
        },
        addProductGroup: {
            type: productGroupType,
            args: {
                name: {type: GraphQLString}
            },
            resolve(parent, args){
                const productGroup = new ProductGroup
            }
        }
    }
});

export default new GraphQLSchema({
    query: RootQueryType,
    mutation: MutationType
});