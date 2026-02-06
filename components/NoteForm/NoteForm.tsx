'use client'

import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';

import css from './NoteForm.module.css';
import { useId } from 'react';
import { createNote } from '@/lib/api';
import type { NewNote } from '../../types/note';

const NotesSchema = Yup.object().shape({
    title: Yup.string().min(3).max(50).required(),
    content: Yup.string().max(500),
    tag: Yup.string().oneOf(["Todo", "Work", 'Personal', 'Meeting', 'Shopping']).required(),
});

interface FormValues {
    title: string,
    content: string,
    tag: "" | 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping',
}


const formValues: FormValues = {
    title: "",
    content: "",
    tag: "",
};

interface NoteFormProps {
    onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
    const fieldId = useId();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newNote: NewNote) => createNote(newNote),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['notes'],
            })
            onClose();
        }
    })


    const handleSubmit = (values: FormValues, FormikHelpers: FormikHelpers<FormValues>) => {
        mutation.mutate(values);
        FormikHelpers.resetForm()
    }


    return (
        <>
            <Formik initialValues={formValues}
                onSubmit={handleSubmit} validationSchema={NotesSchema}
            >
                <Form className={css.form}>
                    <div className={css.formGroup}>
                        <label htmlFor={`title-${fieldId}`}>Title</label>
                        <Field id={`title-${fieldId}`} type="text" name="title" className={css.input} />
                        <ErrorMessage component="span" name="title" className={css.error} />
                    </div>

                    <div className={css.formGroup}>
                        <label htmlFor={`content-${fieldId}`}>Content</label>
                        <Field as="textarea"
                            id={`content-${fieldId}`}
                            name="content"
                            rows={8}
                            className={css.textarea}
                        />
                        <ErrorMessage component="span" name="content" className={css.error} />
                    </div>

                    <div className={css.formGroup}>
                        <label htmlFor={`tag-${fieldId}`}>Tag</label>
                        <Field as="select" id={`tag-${fieldId}`} name="tag" className={css.select}>
                            <option value="">-- Choose tag --</option>
                            <option value="Todo">Todo</option>
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                            <option value="Meeting">Meeting</option>
                            <option value="Shopping">Shopping</option>
                        </Field>
                        <ErrorMessage component="span" name="tag" className={css.error} />
                    </div>

                    <div className={css.actions}>
                        <button type="button" className={css.cancelButton} onClick={onClose}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={css.submitButton}
                            disabled={false}>
                            Create note
                        </button>
                    </div>
                </Form>
            </Formik >
        </>
    )
}