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
        category: 'Workshop',
        title: 'Career Fair Prep + Resumé Workshop',
        hostname: 'ACM',
        start: DateTime.fromFormat('5:30 PM, September 4, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        end: DateTime.fromFormat('7:30 PM, September 4, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        location: 'Woodward 154',
        details: 'Nam sit lacus sapien varius urna sagittis torquent purus? Class velit vel tempor consequat urna litora cubilia. Hac vivamus sociosqu cubilia tristique sollicitudin leo. Nulla donec vulputate; turpis dictum mattis ornare vivamus. Accumsan venenatis massa at scelerisque semper maecenas. Hac neque primis dolor hendrerit accumsan. Leo nec dui imperdiet egestas id.',
        image: null, // this will be a file path to the where the image is uploaded eventually
        createdAt: DateTime.fromISO('2024-08-30T12:48:00').toISO() // hardcoded to the start of the project in case I need it later
    },
    {
        id: '2',
        category: 'Tech-Talk',
        title: 'Frontend Development Tech Talk with Uriah Jeshurun',
        hostname: 'ACM',
        start: DateTime.fromFormat('5:30 PM, September 11, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        end: DateTime.fromFormat('7:30 PM, September 11, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        location: 'Woodward 154',
        details: 'Sociosqu imperdiet odio blandit posuere bibendum scelerisque. Sollicitudin nam senectus leo efficitur viverra. Justo magnis accumsan lobortis faucibus tellus metus per tincidunt. Condimentum nisl montes; magnis turpis bibendum blandit placerat. Luctus faucibus nostra nostra duis metus. Egestas integer conubia tincidunt cubilia, arcu potenti potenti. Platea sapien conubia maecenas aenean efficitur nostra praesent vitae? Efficitur tempus lorem curae nullam mauris in.',
        image: null, // this will be a file path to the where the image is uploaded eventually
        createdAt: DateTime.fromISO('2024-08-30T12:48:00').toISO() // hardcoded to the start of the project in case I need it later
    },
    {
        id: '3',
        category: 'Meeting',
        title: 'Career Fair Postmortem + Liam C. Talkback',
        hostname: 'ACM',
        start: DateTime.fromFormat('5:30 PM, September 18, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        end: DateTime.fromFormat('7:30 PM, September 18, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        location: 'Woodward 154',
        details: 'Ad duis congue; pharetra eros pretium class fermentum. Fringilla torquent rhoncus elementum tempor venenatis ac. Sodales blandit class duis; turpis facilisis metus eget. Eget sapien efficitur mus diam eros tortor ante purus mollis. Laoreet convallis maecenas cursus elit id cursus ac aptent. Mus elementum aliquet efficitur magna ut. Fermentum vitae pharetra laoreet arcu rutrum tristique litora. Arcu nam netus quam lacus ex faucibus penatibus auctor.',
        image: null, // this will be a file path to the where the image is uploaded eventually
        createdAt: DateTime.fromISO('2024-08-30T12:48:00').toISO() // hardcoded to the start of the project in case I need it later
    },
    {
        id: '4',
        category: 'Meeting',
        title: 'Leetcode/Pair Programming Practice',
        hostname: 'ACM',
        start: DateTime.fromFormat('5:30 PM, September 25, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        end: DateTime.fromFormat('7:30 PM, September 25, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        location: 'Woodward 154',
        details: 'Massa proin class ullamcorper mauris dui nascetur. Aptent elementum venenatis tempus volutpat eget mattis? Leo porta nulla augue venenatis sollicitudin neque. Lacus ut maximus tortor in imperdiet at pellentesque morbi magna. Eu inceptos etiam mauris conubia; iaculis tempus in curae hendrerit. Magna placerat sagittis pulvinar convallis quisque turpis.',
        image: null, // this will be a file path to the where the image is uploaded eventually
        createdAt: DateTime.fromISO('2024-08-30T12:48:00').toISO() // hardcoded to the start of the project in case I need it later
    },
    {
        id: '5',
        category: 'Panel',
        title: 'CCI Alumni Panel',
        hostname: 'ACM',
        start: DateTime.fromFormat('5:30 PM, October 2, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        end: DateTime.fromFormat('7:30 PM, October 2, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        location: 'Woodward 154',
        details: 'Potenti arcu sollicitudin consectetur, conubia donec magna. Tempus nulla mi netus diam suspendisse, iaculis cursus leo. Finibus mattis mus morbi dolor facilisi mus? Sit nisl tortor nunc auctor nibh sagittis netus. Pulvinar vestibulum velit turpis at rhoncus pretium diam. Posuere cursus aptent euismod curabitur a suspendisse.',
        image: null, // this will be a file path to the where the image is uploaded eventually
        createdAt: DateTime.fromISO('2024-08-30T12:48:00').toISO() // hardcoded to the start of the project in case I need it later
    },
    {
        id: '6',
        category: 'Tech-Talk',
        title: 'Cybersecurity Tech Talk with Lance Peterman',
        hostname: 'ACM',
        start: DateTime.fromFormat('5:30 PM, October 9, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        end: DateTime.fromFormat('7:30 PM, October 9, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        location: 'Woodward 154',
        details: 'Vehicula ex erat id, parturient facilisis sodales. Dictumst morbi dignissim cursus ex natoque. Litora fringilla proin pretium interdum lectus ligula montes id lorem. Tortor adipiscing turpis adipiscing pharetra in, justo porta suscipit. Ante cursus amet viverra amet, mi dapibus justo natoque? Gravida sit gravida fames amet, maximus conubia curabitur. Neque nisi sapien penatibus vulputate amet odio tortor montes vivamus. Nec libero nibh hac amet curae maecenas ridiculus?',
        image: null, // this will be a file path to the where the image is uploaded eventually
        createdAt: DateTime.fromISO('2024-08-30T12:48:00').toISO() // hardcoded to the start of the project in case I need it later
    },
    {
        id: '7',
        category: 'Meeting',
        title: 'Leetcode/Pair Programming Practice',
        hostname: 'ACM',
        start: DateTime.fromFormat('5:30 PM, October 16, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        end: DateTime.fromFormat('7:30 PM, October 16, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        location: 'Woodward 154',
        details: 'At ut pretium maecenas facilisi efficitur? Egestas luctus ante porta platea tristique, ac rhoncus neque sodales. Ipsum laoreet dui tempor praesent eget integer elit. Sagittis himenaeos in nulla sapien fusce feugiat. Efficitur iaculis cubilia vivamus penatibus convallis montes ultrices elementum. Mollis parturient parturient nunc taciti porttitor habitasse venenatis ut. Suscipit urna phasellus, litora potenti in conubia sollicitudin phasellus. Platea justo a consectetur odio adipiscing.',
        image: null, // this will be a file path to the where the image is uploaded eventually
        createdAt: DateTime.fromISO('2024-08-30T12:48:00').toISO() // hardcoded to the start of the project in case I need it later
    },
    {
        id: '8',
        category: 'Workshop',
        title: 'Lucid Programming Competition Prep Workshop',
        hostname: 'ACM',
        start: DateTime.fromFormat('5:30 PM, October 23, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        end: DateTime.fromFormat('7:30 PM, October 23, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        location: 'Woodward 154',
        details: 'Mi etiam convallis a, dictum litora posuere velit penatibus sed. Fusce vulputate porta, imperdiet imperdiet per sollicitudin erat elit. Magna nascetur laoreet inceptos praesent nisi id natoque sem. Mollis dictum erat diam sodales luctus ridiculus fames fames turpis. Ultrices praesent habitant a finibus ligula dapibus mollis aliquet tellus. Nullam magna habitant risus congue pulvinar erat adipiscing? Massa fusce habitant ac nulla penatibus mollis ad faucibus? Apretium convallis nec ex magnis. Erat malesuada ad condimentum molestie vestibulum purus turpis cursus morbi. Erat pellentesque vitae iaculis posuere praesent est nam nostra.',
        image: null, // this will be a file path to the where the image is uploaded eventually
        createdAt: DateTime.fromISO('2024-08-30T12:48:00').toISO() // hardcoded to the start of the project in case I need it later
    },
    {
        id: '9',
        category: 'Meeting',
        title: 'Happy Hallo-world Social',
        hostname: 'ACM',
        start: DateTime.fromFormat('5:30 PM, October 30, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        end: DateTime.fromFormat('7:30 PM, October 30, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        location: 'Woodward 154',
        details: 'Tempus pulvinar viverra class non sodales ex. Faucibus blandit lacus amet potenti phasellus neque dapibus sed. Faucibus elementum leo maecenas curabitur viverra dui tincidunt. Nulla mauris ultrices ut; integer bibendum cursus eleifend lacinia in. Ipsum eleifend leo interdum vitae vitae non faucibus. Faucibus consectetur sodales massa adipiscing vestibulum dignissim sociosqu phasellus. Mauris cras nam facilisis facilisi varius natoque netus. Nascetur enim faucibus sapien nulla, rutrum nam. Blandit convallis nostra tincidunt nibh convallis.',
        image: null, // this will be a file path to the where the image is uploaded eventually
        createdAt: DateTime.fromISO('2024-08-30T12:48:00').toISO() // hardcoded to the start of the project in case I need it later
    }
];

exports.find = () => events;
exports.findById = function(id) {
    let event = events.find(event => event.id === id);
    if(event) {
        event.start = DateTime.fromISO(event.start).toLocaleString(DateTime.DATETIME_FULL);
        event.end = DateTime.fromISO(event.end).toLocaleString(DateTime.DATETIME_FULL);
    }
    return event;
};

exports.save = function(event) {
    event.id = uuidv4();
    event.start = DateTime.fromFormat(event.start, 'h:mm a, MMMM d, yyyy').toISO();
    event.end = DateTime.fromFormat(event.end, 'h:mm a, MMMM d, yyyy').toISO();
    event.createdAt = DateTime.now().toUTC().toISO(); // store the actual time at which a new event is submitted
    events.push(event);
};

exports.updateById = function(id, newEvent) {
    let event = events.find(event=>event.id === id);
    if(event) {
        event.title = newEvent.title;
        event.details = newEvent.details;
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