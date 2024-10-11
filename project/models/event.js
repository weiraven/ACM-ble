const { DateTime } = require("luxon");
const {v4: uuidv4} = require('uuid');

const events = [
    {
        id: '1',
        category: 'Workshop',
        title: 'Career Fair Prep + Resumé Workshop',
        hostname: 'ACM',
        topic: null,
        speaker: null,
        start: DateTime.fromFormat('5:30 PM, September 4, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        end: DateTime.fromFormat('7:30 PM, September 4, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        location: 'Woodward 154',
        details: 'Nam sit lacus sapien varius urna sagittis torquent purus? Class velit vel tempor consequat urna litora cubilia. Hac vivamus sociosqu cubilia tristique sollicitudin leo. Nulla donec vulputate; turpis dictum mattis ornare vivamus. Accumsan venenatis massa at scelerisque semper maecenas. Hac neque primis dolor hendrerit accumsan. Leo nec dui imperdiet egestas id.',
        image: null,
        createdAt: DateTime.fromISO('2024-08-30T12:48:00').toISO() // hardcoded to the start of the project in case I need it later
    },
    {
        id: '2',
        category: 'Tech-Talk',
        title: 'Journey Through Frontend Development',
        hostname: 'ACM',
        topic: 'Frontend Development Tech Talk & AMA',
        speaker: 'Uriah Jeshurun (Crowd Strike)',
        start: DateTime.fromFormat('5:30 PM, September 11, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        end: DateTime.fromFormat('7:30 PM, September 11, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        location: 'Woodward 154',
        details: 'Sociosqu imperdiet odio blandit posuere bibendum scelerisque. Sollicitudin nam senectus leo efficitur viverra. Justo magnis accumsan lobortis faucibus tellus metus per tincidunt. Condimentum nisl montes; magnis turpis bibendum blandit placerat. Luctus faucibus nostra nostra duis metus. Egestas integer conubia tincidunt cubilia, arcu potenti potenti. Platea sapien conubia maecenas aenean efficitur nostra praesent vitae? Efficitur tempus lorem curae nullam mauris in.',
        image: 'frontend_dev.jpg',
        createdAt: DateTime.fromISO('2024-08-30T12:48:00').toISO() // hardcoded to the start of the project in case I need it later
    },
    {
        id: '3',
        category: 'Meeting',
        title: 'Career Fair Postmortem + Student Survey Talkback',
        hostname: 'ACM',
        topic: null,
        speaker: 'Liam C.',
        start: DateTime.fromFormat('5:30 PM, September 18, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        end: DateTime.fromFormat('7:30 PM, September 18, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        location: 'Woodward 154',
        details: 'Ad duis congue; pharetra eros pretium class fermentum. Fringilla torquent rhoncus elementum tempor venenatis ac. Sodales blandit class duis; turpis facilisis metus eget. Eget sapien efficitur mus diam eros tortor ante purus mollis. Laoreet convallis maecenas cursus elit id cursus ac aptent. Mus elementum aliquet efficitur magna ut. Fermentum vitae pharetra laoreet arcu rutrum tristique litora. Arcu nam netus quam lacus ex faucibus penatibus auctor.',
        image: null,
        createdAt: DateTime.fromISO('2024-08-30T12:48:00').toISO() // hardcoded to the start of the project in case I need it later
    },
    {
        id: '4',
        category: 'Meeting',
        title: 'Leetcode/Pair Programming Practice',
        hostname: 'ACM',
        topic: null,
        speaker: null,
        start: DateTime.fromFormat('5:30 PM, September 25, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        end: DateTime.fromFormat('7:30 PM, September 25, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        location: 'Woodward 154',
        details: 'Massa proin class ullamcorper mauris dui nascetur. Aptent elementum venenatis tempus volutpat eget mattis? Leo porta nulla augue venenatis sollicitudin neque. Lacus ut maximus tortor in imperdiet at pellentesque morbi magna. Eu inceptos etiam mauris conubia; iaculis tempus in curae hendrerit. Magna placerat sagittis pulvinar convallis quisque turpis.',
        image: null,
        createdAt: DateTime.fromISO('2024-08-30T12:48:00').toISO() // hardcoded to the start of the project in case I need it later
    },
    {
        id: '5',
        category: 'Panel',
        title: 'CCI Grads with Jobs Panel',
        hostname: 'ACM',
        topic: 'Alumni Panel',
        speaker: "Elise Frazier (TIAA), Tyler Minnis (Lowe's Tech), and Dylan Halstead (RVO Health)",
        start: DateTime.fromFormat('5:30 PM, October 2, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        end: DateTime.fromFormat('7:30 PM, October 2, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        location: 'Woodward 154',
        details: 'Potenti arcu sollicitudin consectetur, conubia donec magna. Tempus nulla mi netus diam suspendisse, iaculis cursus leo. Finibus mattis mus morbi dolor facilisi mus? Sit nisl tortor nunc auctor nibh sagittis netus. Pulvinar vestibulum velit turpis at rhoncus pretium diam. Posuere cursus aptent euismod curabitur a suspendisse.',
        image: 'alums_in_tech_panel.jpg',
        createdAt: DateTime.fromISO('2024-08-30T12:48:00').toISO() // hardcoded to the start of the project in case I need it later
    },
    {
        id: '6',
        category: 'Tech-Talk',
        title: 'Lessons from the Field as a Cybersecurity Professional',
        hostname: 'ACM',
        topic: 'Cybersecurity Tech Talk & AMA',
        speaker: 'Lance Peterman, CIDPRO',
        start: DateTime.fromFormat('5:30 PM, October 9, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        end: DateTime.fromFormat('7:30 PM, October 9, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        location: 'Woodward 154',
        details: 'Vehicula ex erat id, parturient facilisis sodales. Dictumst morbi dignissim cursus ex natoque. Litora fringilla proin pretium interdum lectus ligula montes id lorem. Tortor adipiscing turpis adipiscing pharetra in, justo porta suscipit. Ante cursus amet viverra amet, mi dapibus justo natoque? Gravida sit gravida fames amet, maximus conubia curabitur. Neque nisi sapien penatibus vulputate amet odio tortor montes vivamus. Nec libero nibh hac amet curae maecenas ridiculus?',
        image: 'cybersecurity_tech_talk.jpg',
        createdAt: DateTime.fromISO('2024-08-30T12:48:00').toISO()
    },
    {
        id: '7',
        category: 'Meeting',
        title: 'Leetcode/Pair Programming Practice',
        hostname: 'ACM',
        topic: null,
        speaker: null,
        start: DateTime.fromFormat('5:30 PM, October 16, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        end: DateTime.fromFormat('7:30 PM, October 16, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        location: 'Woodward 154',
        details: 'At ut pretium maecenas facilisi efficitur? Egestas luctus ante porta platea tristique, ac rhoncus neque sodales. Ipsum laoreet dui tempor praesent eget integer elit. Sagittis himenaeos in nulla sapien fusce feugiat. Efficitur iaculis cubilia vivamus penatibus convallis montes ultrices elementum. Mollis parturient parturient nunc taciti porttitor habitasse venenatis ut. Suscipit urna phasellus, litora potenti in conubia sollicitudin phasellus. Platea justo a consectetur odio adipiscing.',
        image: null,
        createdAt: DateTime.fromISO('2024-08-30T12:48:00').toISO()
    },
    {
        id: '8',
        category: 'Workshop',
        title: 'Lucid Programming Competition Prep Workshop',
        hostname: 'ACM',
        topic: 'Coding Competition Preparation & SWE Tech Talk',
        speaker: 'Jaden Peterson (Lucid)',
        start: DateTime.fromFormat('5:30 PM, October 23, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        end: DateTime.fromFormat('7:30 PM, October 23, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        location: 'Woodward 154',
        details: 'Mi etiam convallis a, dictum litora posuere velit penatibus sed. Fusce vulputate porta, imperdiet imperdiet per sollicitudin erat elit. Magna nascetur laoreet inceptos praesent nisi id natoque sem. Mollis dictum erat diam sodales luctus ridiculus fames fames turpis. Ultrices praesent habitant a finibus ligula dapibus mollis aliquet tellus. Nullam magna habitant risus congue pulvinar erat adipiscing? Massa fusce habitant ac nulla penatibus mollis ad faucibus? Apretium convallis nec ex magnis. Erat malesuada ad condimentum molestie vestibulum purus turpis cursus morbi. Erat pellentesque vitae iaculis posuere praesent est nam nostra.',
        image: 'lucid_programming.png',
        createdAt: DateTime.fromISO('2024-08-30T12:48:00').toISO()
    },
    {
        id: '9',
        category: 'Meeting',
        title: 'Happy Hallo-world Social',
        hostname: 'ACM',
        topic: null,
        speaker: null,
        start: DateTime.fromFormat('5:30 PM, October 30, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        end: DateTime.fromFormat('7:30 PM, October 30, 2024', 'h:mm a, MMMM d, yyyy').toISO(),
        location: 'Woodward 154',
        details: 'Tempus pulvinar viverra class non sodales ex. Faucibus blandit lacus amet potenti phasellus neque dapibus sed. Faucibus elementum leo maecenas curabitur viverra dui tincidunt. Nulla mauris ultrices ut; integer bibendum cursus eleifend lacinia in. Ipsum eleifend leo interdum vitae vitae non faucibus. Faucibus consectetur sodales massa adipiscing vestibulum dignissim sociosqu phasellus. Mauris cras nam facilisis facilisi varius natoque netus. Nascetur enim faucibus sapien nulla, rutrum nam. Blandit convallis nostra tincidunt nibh convallis.',
        image: 'happy_hallo-world.png',
        createdAt: DateTime.fromISO('2024-08-30T12:48:00').toISO()
    }
];

exports.find = () => events;
exports.findById = function(id) {
    return events.find(event => event.id === id);
};

exports.save = function(event) {
    event.id = uuidv4();
    event.category = event.category;
    event.title = event.title;
    event.hostname = event.hostname;
    event.topic = event.topic || null;
    event.speaker = event.speaker || null;
    event.start = event.start;
    event.end = event.end;
    event.location = event.location;
    event.details = event.details;
    event.image = event.image || null;
    event.createdAt = DateTime.now().toUTC().toISO(); // store the actual time at which a new event is submitted
    // console.log('New Event:', event); // Log the new event to verify it's saved correctly
    events.push(event);
};

exports.updateById = function(id, newEvent) {
    let event = events.find(event=>event.id === id);
    if (event) {
        event.category = newEvent.category;
        event.title = newEvent.title;
        event.hostname = newEvent.hostname;
        event.topic = newEvent.topic || null;
        event.speaker = newEvent.speaker || null;
        event.start = newEvent.start;
        event.end = newEvent.end;
        event.location = newEvent.location;
        event.details = newEvent.details;
        event.image = newEvent.image || event.image;
        return true;
    } else {
        return false;
    }
};

exports.deleteById = function(id) {
    let index = events.findIndex(event=>event.id === id);
    if (index !== -1) {
        events.splice(index, 1);
        return true;
    } else {
        return false;
    }
};