/** Safe to say a better name wouldn't kill here */

import { CreateUserBody } from '../models/create_user';
import { Document } from '../models/document';
import { DocumentMetadata } from '../models/document_metadata';
import { JwtClaims } from '../models/jwt_claims';

const BACKEND_ROOT_URL = `https://${window.location.host}/api`;

/** Sign up the user */
export async function signUp(data: CreateUserBody): Promise<boolean> {
  try {
    console.log(JSON.stringify(data));
    const result = await fetch(`${BACKEND_ROOT_URL}/users`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return result.ok;
  } catch (e) {
    return false;
  }
}

/** Validate the email */
export async function validateEmail(emailId: string): Promise<boolean> {
  const result = await fetch(`${BACKEND_ROOT_URL}/users/validate/${emailId}`, {
    method: 'POST',
  });
  return result.ok;
}

/** Login the user, feeding back metadata */
export async function login(email: string, password: string): Promise<JwtClaims | undefined> {
  const result = await fetch(`${BACKEND_ROOT_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!result.ok) {
    return undefined;
  }

  return await result.json();
}

/** Log out the user, don't forget to delete LocalStore */
export async function logout() {
  await fetch(`${BACKEND_ROOT_URL}/users/logout`, {
    method: 'POST',
    credentials: 'include',
  });
}

/** Get the documents related to the user */
export async function listDocuments(): Promise<DocumentMetadata[]> {
  const result = await fetch(`${BACKEND_ROOT_URL}/documents`, {
    credentials: 'include',
  });
  return await result.json();
}

/** Create a new document */
export async function createDocument(documentName: string, documentPath: string): Promise<DocumentMetadata> {
  const result = await fetch(`${BACKEND_ROOT_URL}/documents`, {
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({ name: documentName, path: documentPath }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await result.json();
}

/** Get a new document, maybe through the proxy link ? */
export async function getDocument(documentId: string): Promise<Document> {
  const result = await fetch(`${BACKEND_ROOT_URL}/documents/${documentId}`, {
    credentials: 'include',
  });

  // Do an additional decoding step, since it is encoded into a string
  const userDocument: Document = await result.json();
  try {
    userDocument.data = JSON.parse(userDocument.data);
  } catch (error) {
    userDocument.data = undefined;
  }

  return userDocument;
}

/** Save the document, maybe through the proxy link ? */
export async function saveDocument(documentId: string, userDocument: Document): Promise<boolean> {
  const result = await fetch(`${BACKEND_ROOT_URL}/documents/${documentId}`, {
    credentials: 'include',
    method: 'PUT',
    body: JSON.stringify({ ...userDocument, data: JSON.stringify(userDocument.data) }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return result.ok;
}
