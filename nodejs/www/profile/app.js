const updateProfile = (params) => {
    console.log(params);
}

liff.init({
    liffId: "2006072569-5Qb1xK2R",
    withLoginOnExternalBrowser: true,
}).then(() => {
    liff.getProfile().then(profile => {
        const userId = profile.userId;
        const displayName = profile.displayName;
        const pictureUrl = profile.pictureUrl;
        document.getElementById('login').style.display = 'none';
        document.getElementById('logout').style.display = 'block';
        document.getElementById('pictureUrl').src = pictureUrl;
        document.getElementById('userid').value = userId;

        fetch('/checkdam/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid: userId,
                username: displayName
            })
        }).then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById('username').value = data.data.username;
                    document.getElementById('fname').value = data.data.fname;
                    document.getElementById('lname').value = data.data.lname;
                    document.getElementById('mooban').value = data.data.mooban;
                    document.getElementById('auth').value = data.data.auth;
                    // console.log(data);
                } else {
                    console.error('Error:', data.error);
                }
            }).catch(
                err => console.error(err)
            );
    }).catch(
        err => console.error(err)
    );
});

document.getElementById('login').style.display = 'block';
document.getElementById('logout').style.display = 'none';

const openToast = () => {
    var toast = new bootstrap.Toast(document.getElementById('myToast'));
    toast.show();

    setTimeout(function () {
        toast.hide();

    }, 3000);
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('profileForm');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const userid = document.getElementById('userid').value;
        const username = document.getElementById('username').value;
        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value;
        const mooban = document.getElementById('mooban').value;
        const auth = document.getElementById('auth').value;

        const data = { userid, username, fname, lname, mooban, auth };

        try {
            const response = await fetch('/checkdam/api/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            // console.log('Result:', result);
            if (result.success) {
                openToast();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
