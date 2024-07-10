class Queue {
    constructor() {
      this.queue = [];
    }
  
    addToQueue = (teamName) => {
      this.queue.push(teamName);
    };
  
    removeFromQueue = () => {
      if (this.queue.length < 1) {
        return null;
      }
      return this.queue.shift();
    };
  
    getQueue = () => {
      return this.queue;
    };

    getQueueString = () => {
      if (this.queue.length < 1) {
        return "No teams in queue!";
      }

      let queueString = "Teams in queue:\n";
      let counter = 1;
      this.queue.forEach(e => {
        queueString += `${counter}) <@&${e.id}>\n`;
        counter++;
      });
      return queueString;
    }
  }
  
module.exports = Queue;
  
