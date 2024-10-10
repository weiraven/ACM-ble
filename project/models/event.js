const { DateTime } = require("luxon");
const {v4: uuidv4} = require('uuid');

// id– unique identifier for the event
// category
// title 
// host name
// start date/time: value for this attribute should be a string in the format of yyyy-mm-ddTmm:ss. 
// end date/time: value for this attribute should be a string in the format of yyyy-mm-ddTmm:ss. 
// details
// image - stores the file path to the file in the project directory

const events = [
    {
        id: '1',
        category: 'Meeting',
        title: 'Career Fair Prep + Resumé Workshop',
        hostname: 'ACM',
        start: '5:30 PM, September 4, 2024', // this needs to be converted into the format of yyyy-mm-ddTmm:ss using luxon
        end: '7:30 PM, September 4, 2024', // this needs to be converted into the format of yyyy-mm-ddTmm:ss using luxon
        details: 'Nam sit lacus sapien varius urna sagittis torquent purus? Class velit vel tempor consequat urna litora cubilia. Hac vivamus sociosqu cubilia tristique sollicitudin leo. Nulla donec vulputate; turpis dictum mattis ornare vivamus. Accumsan venenatis massa at scelerisque semper maecenas. Hac neque primis dolor hendrerit accumsan. Leo nec dui imperdiet egestas id.',
        image: null // this will be a file path to the where the image is uploaded eventually
    },
    {
        id: '2',
        category: 'Tech-Talk',
        title: 'Frontend Development Tech Talk with Uriah Jeshurun',
        hostname: 'ACM',
        start: '5:30 PM, September 11, 2024', // this needs to be converted into the format of yyyy-mm-ddTmm:ss using luxon
        end: '7:30 PM, September 11, 2024', // this needs to be converted into the format of yyyy-mm-ddTmm:ss using luxon
        details: 'Nam sit lacus sapien varius urna sagittis torquent purus? Class velit vel tempor consequat urna litora cubilia. Hac vivamus sociosqu cubilia tristique sollicitudin leo. Nulla donec vulputate; turpis dictum mattis ornare vivamus. Accumsan venenatis massa at scelerisque semper maecenas. Hac neque primis dolor hendrerit accumsan. Leo nec dui imperdiet egestas id.',
        image: null // this will be a file path to the where the image is uploaded eventually
    },
    {
        id: '3',
        category: 'Meeting',
        title: 'Career Fair Postmortem + Liam C. Talkback',
        hostname: 'ACM',
        start: '5:30 PM, September 18, 2024', // this needs to be converted into the format of yyyy-mm-ddTmm:ss using luxon
        end: '7:30 PM, September 18, 2024', // this needs to be converted into the format of yyyy-mm-ddTmm:ss using luxon
        details: 'Nam sit lacus sapien varius urna sagittis torquent purus? Class velit vel tempor consequat urna litora cubilia. Hac vivamus sociosqu cubilia tristique sollicitudin leo. Nulla donec vulputate; turpis dictum mattis ornare vivamus. Accumsan venenatis massa at scelerisque semper maecenas. Hac neque primis dolor hendrerit accumsan. Leo nec dui imperdiet egestas id.',
        image: null // this will be a file path to the where the image is uploaded eventually
    },
    {
        id: '4',
        category: 'Meeting',
        title: 'Leetcode/Pair Programming Practice',
        hostname: 'ACM',
        start: '5:30 PM, September 25, 2024', // this needs to be converted into the format of yyyy-mm-ddTmm:ss using luxon
        end: '7:30 PM, September 25, 2024', // this needs to be converted into the format of yyyy-mm-ddTmm:ss using luxon
        details: 'Nam sit lacus sapien varius urna sagittis torquent purus? Class velit vel tempor consequat urna litora cubilia. Hac vivamus sociosqu cubilia tristique sollicitudin leo. Nulla donec vulputate; turpis dictum mattis ornare vivamus. Accumsan venenatis massa at scelerisque semper maecenas. Hac neque primis dolor hendrerit accumsan. Leo nec dui imperdiet egestas id.',
        image: null // this will be a file path to the where the image is uploaded eventually
    },
    {
        id: '5',
        category: 'Panel',
        title: 'CCI Alumni Panel',
        hostname: 'ACM',
        start: '5:30 PM, October 2, 2024', // this needs to be converted into the format of yyyy-mm-ddTmm:ss using luxon
        end: '7:30 PM, October 2, 2024', // this needs to be converted into the format of yyyy-mm-ddTmm:ss using luxon
        details: 'Nam sit lacus sapien varius urna sagittis torquent purus? Class velit vel tempor consequat urna litora cubilia. Hac vivamus sociosqu cubilia tristique sollicitudin leo. Nulla donec vulputate; turpis dictum mattis ornare vivamus. Accumsan venenatis massa at scelerisque semper maecenas. Hac neque primis dolor hendrerit accumsan. Leo nec dui imperdiet egestas id.',
        image: null // this will be a file path to the where the image is uploaded eventually
    },
    {
        id: '6',
        category: 'Tech-Talk',
        title: 'Cybersecurity Tech Talk with Lance Peterman',
        hostname: 'ACM',
        start: '5:30 PM, October 9, 2024', // this needs to be converted into the format of yyyy-mm-ddTmm:ss using luxon
        end: '7:30 PM, October 9, 2024', // this needs to be converted into the format of yyyy-mm-ddTmm:ss using luxon
        details: 'Nam sit lacus sapien varius urna sagittis torquent purus? Class velit vel tempor consequat urna litora cubilia. Hac vivamus sociosqu cubilia tristique sollicitudin leo. Nulla donec vulputate; turpis dictum mattis ornare vivamus. Accumsan venenatis massa at scelerisque semper maecenas. Hac neque primis dolor hendrerit accumsan. Leo nec dui imperdiet egestas id.',
        image: null // this will be a file path to the where the image is uploaded eventually
    }

];

exports.find = () => events;
exports.findById = function(id) {
    return events.find(event=>event.id === id);
}; // or simply: id => events.find(event=>event.id === id);

exports.save = function(event) {
    event.id = uuidv4();
    event.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    events.push(event);
};

exports.updateById = function(id, newEvent) {
    let event = events.find(event=>event.id === id);
    if(event) {
        event.title = newEvent.title;
        event.content = newEvent.content;
        return true;
    } else {
        return false;
    }
}

exports.deleteById = function(id) {
    let index = events.findIndex(event=>event.id === id);
    if(index !== -1) {
        events.splice(index, 1);
        return true;
    } else {
        return false;
    }
}