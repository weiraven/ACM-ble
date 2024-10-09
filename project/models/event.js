const { DateTime } = require("luxon");
const {v4: uuidv4} = require('uuid');

const events = [
    {
        id: '1',
        title: 'Career Fair Prep + Resumé Workshop',
        content: 'Nam sit lacus sapien varius urna sagittis torquent purus? Class velit vel tempor consequat urna litora cubilia. Hac vivamus sociosqu cubilia tristique sollicitudin leo. Nulla donec vulputate; turpis dictum mattis ornare vivamus. Accumsan venenatis massa at scelerisque semper maecenas. Hac neque primis dolor hendrerit accumsan. Leo nec dui imperdiet egestas id.',
        occursAt: 'September 4, 2024',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '2',
        title: 'Frontend Development Tech Talk',
        content: 'Nam sit lacus sapien varius urna sagittis torquent purus? Class velit vel tempor consequat urna litora cubilia. Hac vivamus sociosqu cubilia tristique sollicitudin leo. Nulla donec vulputate; turpis dictum mattis ornare vivamus. Accumsan venenatis massa at scelerisque semper maecenas. Hac neque primis dolor hendrerit accumsan. Leo nec dui imperdiet egestas id.',
        occursAt: 'September 11, 2024',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '3',
        title: 'Career Fair Postmortem + Talkback with Liam C.',
        content: 'Nam sit lacus sapien varius urna sagittis torquent purus? Class velit vel tempor consequat urna litora cubilia. Hac vivamus sociosqu cubilia tristique sollicitudin leo. Nulla donec vulputate; turpis dictum mattis ornare vivamus. Accumsan venenatis massa at scelerisque semper maecenas. Hac neque primis dolor hendrerit accumsan. Leo nec dui imperdiet egestas id.',
        occursAt: 'September 18, 2024',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
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