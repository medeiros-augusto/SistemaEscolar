// Realiza uma requisição para a rota '/getUsers'
fetch('/getUsers')
    .then(response => response.json())  // Converte a resposta para formato JSON
    .then(users => {
        // Obtém a referência para a div onde os dados do usuário serão exibidos
        const userDataDiv = document.getElementById('user-data');
        
        // Mapeia os usuários recebidos e cria um bloco HTML para cada um
        const userList = users.map(user => {
            return `
                <div class="col-sm-6 mt-3">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">${user.nome_usuario}</h5>
                      <p class="card-text">
                        Id: ${user.id_usuario} <br>
                        Senha: ${user.senha_usuario}
                      </p>
                      <!-- Botão para abrir o modal de modificação do usuário -->
                      <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                          data-bs-target="#exampleModal-${user.id_usuario}" data-bs-whatever="${user.nome_usuario}">
                          Modificar nota
                      </button>
                      <!-- Modal para modificar os detalhes do usuário -->
                      <div class="modal fade" id="exampleModal-${user.id_usuario}" tabindex="-1"
                          aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h1 class="modal-title fs-5" id="exampleModalLabel">Modificar ${user.nome_usuario}</h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <!-- Formulário para modificar o usuário -->
                            <form action="/usuarios" method="post">
                                <div class="modal-body">
                                    <!-- Campo para exibir o ID (desativado) -->
                                    <div class="mb-3">
                                        <label for="recipient-name" class="col-form-label">ID:</label>
                                        <input type="number" class="form-control" id="recipient-name" value="${user.id_usuario}" disabled>
                                    </div>
                                    <!-- Campo para enviar o ID -->
                                    <div class="mb-3" style="display: none;">
                                        <label for="recipient-name" class="col-form-label">ID:</label>
                                        <input type="number" name="id" class="form-control" id="recipient-name" value="${user.id_usuario}">
                                    </div>
                                    <!-- Campo para enviar o nome do usuário -->
                                    <div class="mb-3">
                                      <label for="recipient-name" class="col-form-label">Nome:</label>
                                      <input type="text" name="nome" class="form-control" id="recipient-name" value="${user.nome_usuario}">
                                    </div>
                                    <!-- Campo para enviar a senha do usuário -->
                                    <div class="mb-3">
                                        <label for="recipient-name" class="col-form-label">Senha:</label>
                                        <input type="text" name="senha" class="form-control" id="recipient-name" value="${user.senha_usuario}">
                                    </div>
                                </div>
                                <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                  <input type="submit" class="btn btn-primary" value="Modificar">
                                </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            `;
        });

        // Insere os blocos HTML na div de dados do usuário
        userDataDiv.innerHTML = userList.join('');
    })
    .catch(error => {
        // Trata erros caso ocorram durante a requisição
        console.error('Erro ao buscar dados do servidor', error);
    });