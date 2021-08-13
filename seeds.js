const mongoose = require('mongoose');
const Diam = require('./models/diam');

mongoose.connect('mongodb://localhost:27017/diam', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!");
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })



// const d = new Diam({
//     title: 'physics',
//     body: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
//     author: 'santraj yadav',
//     isActive: 'active',
//     location: 'New Delhi'
// })
// d.save()
//     .then(d => {
//         console.log(d)
//     })
//     .catch(e => {
//         console.log(e)
//     })


const seedDetails = [
    {
        title: 'physics',
        body: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        author: 'santraj',
        isActive: 'active',
        location: 'Delhi'
    },
    {
        title: 'chemistry',
        body: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        author: 'santu',
        isActive: 'active',
        location: 'Noida'
    },
    {
        title: 'geography',
        body: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        author: 'santraaz yadav',
        isActive: 'inactive',
        location: 'Hariyana'
    },
    {
        title: 'Mathematics',
        body: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        author: 'santraaz',
        isActive: 'inactive',
        location: 'Punjab'
    },
    {
        title: 'biology',
        body: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        author: 'sant',
        isActive: 'inactive',
        location: 'Lucknow'
    },
]

Diam.insertMany(seedDetails)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })
