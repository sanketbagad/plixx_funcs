import {getStorage} from 'firebase-admin/storage';
import {initializeApp, cert} from 'firebase-admin/app';
import dotenv from 'dotenv';

dotenv.config();

// please work

initializeApp({
    credential: cert({
        "type": "service_account",
        "project_id": "netflixx-6dab7",
        "private_key_id": "95e85b0bb74c4aecabadb839fc4019fb60406d14",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDLgHXb7/lLxIus\niQCehmxlusGkzoVVNi+5i7MlSWx/xe6IE8/HMtfmET1wD765Oiv2jWp4dCTe+AQw\nLZt6yjsRV6nKP5i+5CUjgqNGArKaB3bYG2ON1/TymYK2jbeia5WMOF4fFEuLyCuN\nFiaCQgfXpP3kYnqCtJV8S+eWy18rzt6j2guctqWsT7HgGGJWuIpzX+AyaXudziFs\nbXhktVakIPDWIGh7uaYKMBerAWh9pqo8HYGpDPLt5yA93QlNVf9Y9aNok5s421i0\nBoiJkzp/FtC3+F4zvcz35nQkXANxBJeA6D9p6sFFwRky7yzfLhx2iGYp4cECtDaI\nrlzCVOWJAgMBAAECggEAEI7kyB8IDVKyPLkvDDcK1eIyxGqrbaoJixLjYjrNsb3U\nsUzPYLlx2L35XkdhsOebUSXjjmaA44WRravgVUbkNH6KCbNQBeRBY1jLWTR5/M9z\nq5Ta7l0uiJjWCm2Qjg4r7mtduTCpDvgcFxBA1ONziOfbYrxilIUGDsWMU/g7R7CZ\nwxiPRn++KF9bYEICGD1CgxXs0lNqEmqCpDVa2RiICK2RaYbc2wFxwQ1UErTQhjgI\nZFMCPyOvRdJ3CTRf4QRJgvEIzLX8B+ocC1C5Td7FMedv8VkqAnmJwcqkHBIoh9KQ\neTYuPnVPSHS4AAkns+RhUS7kSlV0+fto7GF51YbOSQKBgQDrEoDG0uU3aKEpk0e6\n3/pPt60cAy72CWpjdFWEtGN5xAIe2AhwikHClWf9MWOlXr3EunDkp0DrL9uc+Yw0\nbF+e/9UG3QRCu6QCC/YCVDcXh4KQZlt6NJEic8bXDxUyulG36gwq+NX6pbO2b1Di\n+UEahuYHtSS17Rw6pdH6xJC1fQKBgQDdnnB2ZrrPyTzpJlGPtlYEX0NMITL3LGzo\noyT7tVekN3DuyuFjwBoqVuSdJlpGzcAVtoLkMe2FCqdNzWfMlCR2Uxmpr/vnLBnK\nt97CPL/eed14VHCuuc0k3xQe3HiL0uYJAatCI2DhVCDa3d73opE7LpYIRY8oQHhH\njlk3Sdn9/QKBgD/RRiS0HIZuYVJoKZESPWJm+xgfxSAGbluRuaXNUzQ7glfdTm0/\nG5s39INIZUT/84T1GLD6tyUiWPzEwst4oH0J90tltUJorp3foWoAcvRwVYHeR/dl\nTgGMbO71qUucSZMkdykzZOQnGCLvFYaJJKOO++QbyVuag49odRkfRCoBAoGBANhK\n/APyuzx0cSgzp8KU+FqIBwxUEoO+LgTWxQ+Mqx6wpV3JUDSklmTgLXtapR0ZTfFj\nEVhZijEgdqyuXjICG5wH+rHr+fRizEFXNudnlvMxCP+ZmehNmnPz7JU6I8SDbtM3\nd8ey86i3DOHPTP9vAEM8cl1cVh243isoONaHE2SZAoGAX4bDqkcV7N3DXVOsjJYv\ndIwXWvOXnCUljMYkKeKl9TAh4+hOfuDrTuev6semWQyw5SCYB5iYsz5rK9eWh5nT\ngGzUThaRQ8FrZEItD0Hj4EtZaa/Xz+xMbsS2DYpems74d+oGd4wp6gggz3pZTN6O\nO2vQAL3zvlPf3Um9daOhhSE=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-j7oja@netflixx-6dab7.iam.gserviceaccount.com",
        "client_id": "116500661719180948736",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-j7oja%40netflixx-6dab7.iam.gserviceaccount.com",
        }),
    
    storageBucket: "gs://netflixx-6dab7.appspot.com",
});

const storage = getStorage().bucket();

export default storage;
    