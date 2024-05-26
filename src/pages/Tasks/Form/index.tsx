import React, { useState, ChangeEvent, useEffect } from "react";
import { Button, Form as BootstrapForm } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import "./index.css";

interface ITask {
    title: string;
    description: string;
}

const Form: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [model, setModel] = useState<ITask>({
        title: "",
        description: "",
    });

    useEffect(() => {
        console.log('Current ID:', id);
        if (id) {
            findTask(id);
        }
    }, [id]);

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setModel({
            ...model,
            [e.target.name]: e.target.value,
        });
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const response = id
                ? await api.put(`/tasks/${id}`, model)
                : await api.post("/tasks", model);
            console.log('Form submission response:', response.data);
            back();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    function back() {
        navigate(-1);
    }

    async function findTask(taskId: string) {
        if (!isNaN(Number(taskId))) {
            try {
                const response = await api.get(`/tasks/${taskId}`);
                console.log('Fetched task:', response.data);
                setModel({
                    title: response.data.title,
                    description: response.data.description,
                });
            } catch (error) {
                console.error('Error fetching task:', error);
            }
        } else {
            console.error('Invalid ID:', taskId);
        }
    }

    return (
        <div className="container">
            <br />
            <div className="task-header">
                <h1>Nova Tarefa</h1>
                <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
            </div>
            <br />
            <div className="container">
                <BootstrapForm onSubmit={onSubmit}>
                    <BootstrapForm.Group>
                        <BootstrapForm.Label>Título</BootstrapForm.Label>
                        <BootstrapForm.Control
                            type="text"
                            name="title"
                            value={model.title}
                            onChange={updatedModel}
                        />
                    </BootstrapForm.Group>
                    <BootstrapForm.Group>
                        <BootstrapForm.Label>Descrição</BootstrapForm.Label>
                        <BootstrapForm.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={model.description}
                            onChange={updatedModel}
                        />
                    </BootstrapForm.Group>
                    <Button variant="dark" type="submit">Salvar</Button>
                </BootstrapForm>
            </div>
        </div>
    );
};

export default Form;
