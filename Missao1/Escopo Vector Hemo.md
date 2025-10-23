**Software: Vector Hemo**

---

### **Escopo do Projeto: Sistema de Apoio ao Diagnóstico de Leucemia Promielocítica Aguda (LPA) por Análise de Hemograma**

#### **1\. Objetivo do Projeto**

Desenvolver um software de apoio ao diagnóstico que utiliza um modelo de Inteligência Artificial para analisar automaticamente exames de hemograma. O objetivo é identificar padrões hematológicos suspeitos de Leucemia Promielocítica Aguda (LPA/M3) e alertar imediatamente os profissionais de saúde, permitindo um acompanhamento rápido de casos de alto risco.

#### **2\. Funcionalidades Principais (Em Escopo)**

O escopo do projeto é definido pelas seguintes funcionalidades, agrupadas por módulo:

**Módulo 1: Entrada e Validação de Dados**

* **Cadastro de Exames:** Permitir que profissionais de saúde cadastrem novos exames de hemograma no sistema.  
* **Múltiplos Formatos de Entrada:** O sistema deve aceitar o envio de exames via arquivos PDF, CSV ou por inserção manual de dados.  
* **Validação de Integridade:** O sistema deve validar automaticamente os dados de entrada para garantir que os valores hematológicos sejam consistentes e estejam dentro dos intervalos biológicos possíveis, rejeitando dados incoerentes.

**Módulo 2: Núcleo de Análise (IA)**

* **Análise Preditiva de LPA:** Processar automaticamente os parâmetros hematológicos (como leucócitos, plaquetas, promielócitos e bastonetes) para identificar padrões compatíveis com LPA.  
* **Aprimoramento Contínuo do Modelo:** Permitir que cientistas de dados re-treinem o modelo de IA usando novos exames rotulados, visando melhorar continuamente a acurácia da detecção.

**Módulo 3: Interface e Visualização (Dashboard)**

* **Painel de Acompanhamento (Dashboard):** Fornecer aos médicos hematologistas um painel centralizado para visualizar todos os exames analisados e seus respectivos status de risco.  
* **Filtros e Destaques:** O painel deve permitir filtros (por paciente, data, risco) e destacar visualmente os casos de alto risco.  
* **Histórico Evolutivo do Paciente:** Permitir que médicos e analistas acessem o histórico completo de exames de um paciente, exibindo a evolução dos parâmetros hematológicos ao longo do tempo através de gráficos.

**Módulo 4: Saídas (Relatórios e Alertas)**

* **Geração de Relatórios Detalhados:** Capacidade de gerar relatórios em PDF dos exames analisados, contendo dados do paciente, gráficos de anomalias e espaço para assinatura, para serem anexados aos prontuários.  
* **Notificações de Alto Risco:** Enviar automaticamente notificações (via e-mail ou push) aos médicos responsáveis quando uma análise for concluída com alta suspeita de LPA (ex: risco $\\ge$ 80%).

**Módulo 5: Integração e Conformidade**

* **Integração com Prontuário Eletrônico (PEP):** O sistema deve ser capaz de se integrar a sistemas hospitalares (PEP) para sincronizar automaticamente os resultados das análises, disponibilizando-os no prontuário do paciente.  
* **Conformidade com a LGPD:** Garantir que todo o tratamento de dados de pacientes siga as normas da LGPD, incluindo o registro de consentimento, anonimização de dados para análise e armazenamento seguro.

#### **3\. Fora do Escopo**

Para manter o foco na detecção exclusiva de LPA e garantir a viabilidade do projeto, os seguintes itens estão **fora do escopo**:

* **Diagnóstico de outras patologias:** O modelo de IA será focado *exclusivamente* na detecção de padrões de LPA (M3). A análise e diagnóstico de outras leucemias, anemias ou distúrbios hematológicos não fazem parte deste escopo.  
* **Recomendação de tratamento:** O software atuará como ferramenta de apoio ao diagnóstico, alertando sobre riscos. Ele *não* fornecerá sugestões de protocolos de tratamento ou prescrição de medicamentos.  
* **Integração direta com hardware laboratorial:** O sistema receberá dados via upload de arquivos (PDF, CSV) ou inserção manual, não estando prevista a conexão direta com os analisadores hematológicos.  
* **Desenvolvimento de aplicativo móvel nativo:** As notificações serão tratadas via serviços existentes (e-mail, push), mas o desenvolvimento de um aplicativo móvel completo e autônomo para gerenciamento do sistema não está incluído.

#### **4\. Premissas e Restrições**

**Premissas:**

* **Disponibilidade de Dados de Treinamento:** Assume-se a existência de um conjunto de dados de hemogramas (com resultados laboratoriais e diagnósticos confirmados de LPA e não-LPA) para o treinamento inicial do modelo de IA.  
* **Cooperação de TI Hospitalar:** A integração com o PEP depende da disponibilidade de APIs (preferencialmente HL7/FHIR ou REST) e documentação por parte dos sistemas hospitalares existentes.

**Restrições (Critérios de Qualidade):**

* **Desempenho da Análise:** O tempo de processamento automático de um exame não deve exceder 10 segundos.  
* **Acurácia do Modelo:** O modelo de IA, após o treinamento, deve atingir uma acurácia mínima de 90% em testes de validação.  
* **Velocidade de Alerta:** As notificações de alto risco devem ser enviadas em até 1 minuto após a detecção.  
* **Segurança (LGPD):** O sistema deve implementar criptografia (ex: AES-256) para dados em repouso e em trânsito e manter logs imutáveis de auditoria e consentimento.

