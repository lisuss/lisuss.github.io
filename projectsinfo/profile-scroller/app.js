const data = [
    {
        name: 'John Doe',
        age: 27,
        gender: 'male',
        lookingfor: 'female',
        location: 'San Diego',
        image: 'https://randomuser.me/api/portraits/men/80.jpg'
    },
    {
        name: 'Allice Doe',
        age: 25,
        gender: 'female',
        lookingfor: 'male',
        location: 'Chicago',
        image: 'https://randomuser.me/api/portraits/women/80.jpg'
    },
    {
        name: 'John Diego',
        age: 50,
        gender: 'male',
        lookingfor: 'female',
        location: 'New York',
        image: 'https://randomuser.me/api/portraits/men/60.jpg'
    },
    {
        name: 'Anna Polanski',
        age: 40,
        gender: 'female',
        lookingfor: 'female',
        location: 'Miami',
        image: 'https://randomuser.me/api/portraits/women/2.jpg'
    }
];

const profiles = profileIterator(data);

// call first
nextProfile();

// Next Event
document.getElementById('next').addEventListener('click', nextProfile);

// Next profile 
function nextProfile() {
    const currentProfile = profiles.next().value;

    if(currentProfile !== undefined) {
    document.getElementById('profileDisplay').innerHTML = `
    <ul class="list-group">
        <li class="list-group-item">Name: ${currentProfile.name}
        </li>
        <li class="list-group-item">Age: ${currentProfile.age}
        </li>
        <li class="list-group-item">Location: ${currentProfile.location}
        </li>
        <li class="list-group-item">Gender: ${currentProfile.gender}
        </li>
        <li class="list-group-item">Looking for: ${currentProfile.lookingfor}
        </li>
    </ul>
    `;

    document.getElementById('imageDisplay').innerHTML = `<img src="${currentProfile.image}"> `;
    } else {
        window.location.reload();
    }
}

function profileIterator(profiles) {
    let nextIndex = 0;

    return {
        next: function() {
            return nextIndex < profiles.length ? 
            { value: profiles[nextIndex++], done: false } :
            { done: true }

        }
    };
}