//not yet built

import { _db } from './db.js';
const resolvers = { 
    Query: {
        news: () => {
            return 
        },
        news_(_, args) {
            return _db.news.find(n => n.id === args.id);
        },
    },
    //using relationship to parent
    News: {
        location(parent) {
            return _db.location.filter(l => l.location_id === parent.id);
        }
    }
}