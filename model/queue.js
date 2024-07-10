class Queue {
    constructor() {
      this.queue = [];
    }
  
    addToQueue = (teamName) => {
      this.queue.push(teamName);
    };
  
    removeFromQueue = () => {
      return this.queue.shift();
    };
  
    getQueue = () => {
      return this.queue;
    };

    getQueueString = () => {
      if (this.queue.length < 1) {
        return "No teams in queue!";
      }

      let queueString = "";
      let counter = 1;
      this.queue.forEach(e => {
        queueString += `${counter}) ${e.name}\n`;
      });
      return queueString;
    }
  }
  
module.exports = Queue;
  
