window.addEventListener('DOMContentLoaded', (event) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    console.log('Query String:', queryString);
    console.log('URL Params:', urlParams);
    console.log('ID:', id);
    
    fetch('../participants.json')
        .then(response => {
            console.log('Fetch response status:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('Participants data:', data);
            const participant = data.find(p => p.id == id);
            console.log('Participant:', participant);

            const invitationText1 = document.getElementById('invitation-text1'); // English

            if (participant) {

                if (invitationText1) {
                    let invitationContent1 = `
                        <h3>You are invited</h3>
                        <h2>We are waiting for you!</h2>
                        <h1>${participant.name}</h1>
                        <h4>Invitation valid for ${participant.valid_for} pass.</h4>
                        <div class="valid-for">${participant.valid_for}</div>
                    `;
                    if (participant.valid_for !== 1) {
                        invitationContent1 = `
                            <h3>You are invited</h3>
                            <h2>We are waiting for you!</h1>
                            <h1>${participant.name}</h1>
                            <h4>Invitation valid for ${participant.valid_for} passes.</h4>
                            <div class="valid-for">${participant.valid_for}</div>
                        `;
                    }
                    invitationText1.innerHTML = invitationContent1;
                }
            } else {
                console.error('Participant not found');
            }
        })
        .catch(error => {
            console.error('Error fetching participants:', error);
        });
});