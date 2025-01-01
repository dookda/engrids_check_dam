const updateProfile = (params) => {
    console.log(params);
}

liff.init({
    liffId: "2006072569-6p3kO2r9",
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
                    getAllUsers();
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

const userModal = new bootstrap.Modal(document.getElementById('updateUserModal'));
const openModal = (data) => {
    document.getElementById('userid').value = data.userid || '';
    document.getElementById('username').value = data.username || '';
    document.getElementById('fname').value = data.fname || '';
    document.getElementById('lname').value = data.lname || '';
    document.getElementById('mooban').value = data.mooban || '';
    document.getElementById('auth').value = data.auth || '';

    userModal.show();
};

const deleteUser = async (userid) => {
    try {
        const response = await fetch('/checkdam/api/user', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userid })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (result.success) {
            openToast();
            getAllUsers();
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

const getAllUsers = async () => {
    try {
        const response = await fetch('/checkdam/api/user');
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
            if ($.fn.DataTable.isDataTable('#usersTable')) {
                $('#usersTable').DataTable().destroy();
            }

            $('#usersTable').DataTable({
                data: data.data,
                columns: [
                    {
                        data: null,
                        render: (rowData) => {
                            return `<button
                                    class="btn btn-danger "
                                    onclick='deleteUser("${rowData.userid}")'>
                                        ลบ
                                </button>
                                <button  
                                    class="btn btn-warning "   
                                    onclick='openModal(${JSON.stringify(rowData)})'>
                                        แก้ไข
                                </button>`;
                        },
                    },
                    { data: 'userid' },
                    { data: 'username' },
                    { data: 'fname' },
                    { data: 'lname' },
                    { data: 'mooban' },
                    { data: 'auth' }
                ],
                scrollX: true,
            });
        } else {
            console.error('Error (API response):', data.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

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
            if (result.success) {
                openToast();
                userModal.hide();
                getAllUsers();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
