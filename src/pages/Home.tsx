import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";

import { Button } from "../components/Button";

import { useAuth } from "../hooks/useAuth";
import { database } from "../services/Firebase";

// import logoImg from "../assets/images/logo.svg";
import prezidentsImg from "../assets/images/memes/prezidents.png";
import googleIconImg from "../assets/images/google-icon.svg";
import "../styles/auth.scss";

export function Home() {
  const navigate = useNavigate();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  const isNotUserAuthenticated = !user;

  async function handleCreateRoom() {
    if (isNotUserAuthenticated) {
      await signInWithGoogle();
    }
    navigate("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    const isRoomCodeEmpty = roomCode.trim() === "";

    if (isRoomCodeEmpty) {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    const isntExistingRoom = !roomRef.exists();

    if (isntExistingRoom) {
      alert("Telpa nav atrasta!");
      return;
    }

    const roomIsAlreadyClosed = roomRef.val().endedAt;

    if (roomIsAlreadyClosed) {
      alert("Istaba jau slēgta");
      return;
    }

    navigate(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <main>
        <div className="main-content">
          {/* <img src={logoImg} alt="Letmeask" /> */}
          <img src={prezidentsImg} alt="Letmeask" style={{width: '170px', marginBottom: '-30px'}}/>

          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Google logo" />
            Izveidot jautājumu istabu ar Google
          </button>
          <div className="divider">vai pievienoties eksistējošai istabai</div>

          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Ievadiet istabas kodu"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Ienākt istabā</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
