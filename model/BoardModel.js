const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
  googleid:{
      type:String
  },
  board:{
    tasks:{
        type:Object,
    },
    columns:{
        type:Object,
        default:{
            'column-1': {
              id: 'column-1',
              title: 'To do',
              taskIds: [],
            },
            'column-2': {
                id: 'column-2',
                title: 'In progress',
                taskIds: [],
              },
              'column-3': {
                id: 'column-3',
                title: 'Pending',
                taskIds: [],
              },
              'column-4':{
                  id:'column-4',
                  title:'Done',
                  taskIds:[]
              },
              'column-5':{
                  id:'column-5',
                  title:'On Hold',
                  taskIds:[]
              }
          }
    },
    columnOrder:{
        type:Array,
        default:['column-1', 'column-2', 'column-3','column-4','column-5'],
    }
  },
  users:{
    type:Array
  },
  name:{
    type:String,
    default:'Board'
  },
  boardname:{
    type:String
  },
  inviteLink:{
    type:String
  }
});

const Board = mongoose.model('board', BoardSchema);

module.exports = Board;