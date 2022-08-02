import { useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import { Button } from '../components/Button';

import { useAuth } from '../hooks/useAuth';
import { database } from '../services/Firebase';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import '../styles/auth.scss';


export function Home() {

    const navigate = useNavigate();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');

    const isNotUserAuthenticated = (!user);

    async function handleCreateRoom() {
        if (isNotUserAuthenticated) {
            await signInWithGoogle();
        }
        navigate('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        const isRoomCodeEmpty = (roomCode.trim() == '');

        if (isRoomCodeEmpty) {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        const isntExistingRoom = (!roomRef.exists())

        if (isntExistingRoom) {
            alert("[ERRO!] Sala não encontrada. [ERRO!]");
            return;
        }

        const roomIsAlreadyClosed = (roomRef.val().endedAt);

        if (roomIsAlreadyClosed) {
            alert("A sala já foi encerrada.")
            return;
        }

        navigate(`/rooms/${roomCode}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Illustration symbolizing  questions and answers" />
                <strong> Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência durante a live.</p>
            </aside>

            <main>

                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />

                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Google logo" />
                        Crie sua sala com o Google
                    </button>
                    <div className="divider">
                        ou entre em uma sala
                    </div>

                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>

        </div>
    )
}