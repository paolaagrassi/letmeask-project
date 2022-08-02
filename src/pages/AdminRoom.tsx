import { useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';

import { RoomCode } from '../components/RoomCode';
import { useRoom } from '../hooks/useRoom';

import '../styles/room.scss';

import { database } from '../services/Firebase';
import { useNavigate } from 'react-router-dom';

type RoomParams = {
    id: string;
}
export function AdminRoom() {
    const navigate = useNavigate();
    const params = useParams<RoomParams>();

    const roomId = params.id!;

    const { title, questions } = useRoom(roomId);

    async function HandleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        navigate('/');
    }

    async function HandleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que você deseja remover esta pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function HandleCheckQuestionAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        });
    }

    async function HandleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
        });
    }

    return (

        <div id="page-room">
            <header>
                <div className="content">

                    <img src={logoImg}
                        alt="Letmeask"
                        onClick={()=> window.location.href="/"}
                    />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={HandleEndRoom}>Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala: {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <div className='question-list'>
                    {questions.map((question) => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >
                                {!question.isAnswered && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => HandleCheckQuestionAnswered(question.id)}
                                        >
                                            <img src={checkImg} alt="Marcar pergunta como respondida" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => HandleHighlightQuestion(question.id)}
                                        >
                                            <img src={answerImg} alt="Dar destaque à pergunta" />
                                        </button>
                                    </>
                                )}

                                <button
                                    type="button"
                                    onClick={() => HandleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>

    )
}