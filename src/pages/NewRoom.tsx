import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";

import logoImg from "../assets/images/logo.svg";
import qfdImg from "../assets/images/memes/qfd.png";

import "../styles/auth.scss";
import { Button } from "../components/Button";
import { database } from "../services/Firebase";

export function NewRoom() {
  const navigate = useNavigate();

  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState("");

  async function handleCreateNewRoom(event: FormEvent) {
    event.preventDefault();

    const isNewRoomInputEmpty = newRoom.trim() == "";
    if (isNewRoomInputEmpty) {
      return;
    }

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    navigate(`/admin/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth">
      <main>
        <div className="main-content">
          {/* <img src={logoImg} alt="Letmeask" /> */}
          <img src={qfdImg} alt="Letmeask" style={{width: '170px'}}/>
          <h1>Labdien, {user?.name}!</h1>
          <h3>Izveidot jaunu telpu</h3>

          <form onSubmit={handleCreateNewRoom}>
            <input
              type="text"
              placeholder="Telpas nosaukums"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Izveidot telpu</Button>
          </form>
          <p>
            Vēlies pievienoties jau eksistējošai telpai?{" "}
            <Link to="/">Spied šeit!</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
