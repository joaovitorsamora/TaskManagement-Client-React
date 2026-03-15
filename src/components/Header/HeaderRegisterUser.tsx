interface User {
  id?: number;
  nome: string;
  email: string;
  senha: string;
}
interface HeaderRegisterProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreateUser: (i: RegisterInput) => void;
  onClickSignUp: () => void;
  newUser: User;
  setNewUser: React.Dispatch<React.SetStateAction<User>>;
  loggedUser: User | null;
}

import type { RegisterInput } from '../../types';
import './css/HeaderRegisterUser.css';
import {
  CancelButton,
  Modal,
  Overlay,
  SubmitButton,
} from './HeaderLogin.styles';
export const HeaderRegisterUser = ({
  loggedUser,
  onClickSignUp,
  isOpen,
  setIsOpen,
  handleCreateUser,
  newUser,
  setNewUser,
}: HeaderRegisterProps) => {
  return (
    <>
      {
        <button
          onClick={onClickSignUp}
          className="botao__cadastro"
          style={!loggedUser ? { display: 'block' } : { display: 'none' }}
        >
          Sign Up
        </button>
      }

      {isOpen && (
        <Overlay onClick={() => setIsOpen(false)}>
          <span
            className="close"
            title="Close Modal"
            onClick={() => setIsOpen(false)}
          >
            &times;
          </span>
          <Modal
            className="modal-content animate"
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateUser(newUser);
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="container-modal">
              <label htmlFor="uname" className="label">
                <b>Nome</b>
              </label>
              <input
                type="text"
                placeholder="Nome"
                name="uname"
                required
                value={newUser.nome}
                onChange={(e) =>
                  setNewUser({ ...newUser, nome: e.target.value })
                }
              />

              <label htmlFor="psw" className="label">
                <b>Email</b>
              </label>
              <input
                type="email"
                placeholder="Email"
                name="psw"
                required
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />

              <label htmlFor="psw" className="label">
                <b>Senha</b>
              </label>
              <input
                type="password"
                placeholder="Digite sua senha"
                name="senha"
                required
                value={newUser.senha}
                onChange={(e) =>
                  setNewUser({ ...newUser, senha: e.target.value })
                }
              />
              <SubmitButton type="submit">Cadastrar</SubmitButton>
              <label>
                <input type="checkbox" checked name="remember" />
              </label>
            </div>

            <div className="container" style={{ backgroundColor: '#f1f1f1' }}>
              <CancelButton
                type="button"
                className="cancelbtn"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </CancelButton>
              <span className="psw">
                Forgot <a href="#">password?</a>
              </span>
            </div>
          </Modal>
        </Overlay>
      )}
    </>
  );
};
