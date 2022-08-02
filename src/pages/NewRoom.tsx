import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';
import { database } from '../services/Firebase';

export function NewRoom() {
    const navigate = useNavigate();

    const { user } = useAuth();
    const [newRoom, setNewRoom] = useState('');

    async function handleCreateNewRoom(event: FormEvent) {
        event.preventDefault();

        const isNewRoomInputEmpty = (newRoom.trim() == '');
        if (isNewRoomInputEmpty) {
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        });

        navigate(`/admin/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Illustration symbolizing  questions and answers" />
                <strong> Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <h1>Olá, {user?.name}!</h1>
                    <h3>Criar uma nova sala</h3>

                    <form onSubmit={handleCreateNewRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
                    </p>
                </div>
            </main>

        </div>
    )
}