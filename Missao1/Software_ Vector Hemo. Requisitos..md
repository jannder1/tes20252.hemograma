**Vector Hemo \- Requisitos**

### **1\. Requisitos Funcionais (RF)**

Os requisitos funcionais são derivados diretamente das Histórias de Usuário (HU-001 a HU-010):

#### **Módulo 1: Entrada e Validação de Dados**

* **RF-001:** O sistema deve permitir que o profissional de saúde cadastre um novo exame de hemograma no sistema.  
  * **RF-001.1:** O sistema deve aceitar o upload de exames nos formatos PDF e CSV.  
  * **RF-001.2:** O sistema deve permitir a inserção manual dos dados do hemograma.  
* **RF-002:** O sistema deve validar a integridade e a consistência dos valores do hemograma inseridos.  
  * **RF-002.1:** O sistema deve rejeitar valores que estejam fora dos intervalos biológicos possíveis (ex: valores incoerentes).  
  * **RF-002.2:** O sistema deve exibir uma mensagem de erro ao usuário e impedir o processamento caso dados inconsistentes sejam detectados.

#### **Módulo 2: Processamento e Análise (IA)**

* **RF-003:** O sistema deve analisar automaticamente os parâmetros hematológicos de um exame cadastrado.  
  * **RF-003.1:** A análise deve focar na identificação de padrões compatíveis com Leucemia Promielocítica Aguda (LPA/M3).  
* **RF-004:** O sistema deve permitir que um cientista de dados utilize novos exames rotulados para re-treinar o modelo de Inteligência Artificial.

#### **Módulo 3: Visualização e Gestão de Resultados**

* **RF-005:** O sistema deve exibir um painel (dashboard) para o médico hematologista, listando os exames analisados e seus resultados.  
  * **RF-005.1:** O painel deve permitir a filtragem de exames por paciente, data e status (risco).  
  * **RF-005.2:** O painel deve destacar visualmente (ex: em vermelho) os casos identificados como de alto risco.  
* **RF-006:** O sistema deve permitir que médicos e analistas consultem o histórico de hemogramas de um paciente específico.  
  * **RF-006.1:** O histórico deve exibir a evolução dos parâmetros hematológicos ao longo do tempo, utilizando gráficos comparativos.

#### **Módulo 4: Relatórios e Notificações**

* **RF-007:** O sistema deve enviar notificações automaticamente ao médico responsável quando um caso suspeito de LPA (alto risco) for detectado.  
  * **RF-007.1:** As notificações devem ser suportadas por e-mail ou aplicativo móvel.  
* **RF-008:** O sistema deve permitir ao profissional de saúde gerar relatórios detalhados dos exames analisados.  
  * **RF-008.1:** O relatório deve ser gerado em formato PDF.  
  * **RF-008.2:** O relatório deve conter a identificação do paciente, data, gráficos, anomalias detectadas e informações para assinatura digital.

#### **Módulo 5: Integração e Conformidade**

* **RF-009:** O sistema deve ser capaz de se integrar com sistemas de Prontuário Eletrônico do Paciente (PEP) hospitalares.  
  * **RF-009.1:** A integração deve permitir a sincronização automática dos resultados da análise para o PEP do paciente.  
* **RF-010:** O sistema deve garantir o tratamento de dados do paciente em conformidade com a Lei Geral de Proteção de Dados (LGPD).  
  * **RF-010.1:** O sistema deve registrar o aceite do termo de consentimento do paciente/usuário.  
  * **RF-010.2:** O sistema deve manter logs de auditoria imutáveis e suportar a anonimização de dados.

---

### **2\. Requisitos Não Funcionais (RNF)**

Os requisitos não funcionais, baseados no levantamento analítico (seção 2.2) e nos critérios das HUs, incluem:

* **RNF-001 (Usabilidade):** A interface do software deve ser intuitiva e fácil de usar, minimizando a necessidade de treinamento extensivo para médicos e técnicos de laboratório.  
* **RNF-002 (Desempenho):** O software deve ser capaz de processar grandes volumes de dados em tempo real.  
  * **RNF-002.1:** O tempo máximo de análise de um hemograma (após o cadastro) deve ser de 10 segundos.  
  * **RNF-002.2:** O envio de notificações de alto risco deve ocorrer em até 1 minuto após a detecção.  
* **RNF-003 (Escalabilidade):** O sistema deve ser escalável para suportar o aumento no número de usuários e no volume de exames processados.  
* **RNF-004 (Segurança):** O sistema deve garantir a confidencialidade dos dados do paciente.

  **RNF-004.1:** Todos os dados sensíveis devem ser armazenados com criptografia (ex: AES-256).

  **RNF-004.2:** O sistema deve possuir rotinas de backup em nuvem.

* **RNF-005 (Confiabilidade/Acurácia):** O modelo de IA deve possuir uma acurácia mínima de 90% nos testes de validação após o re-treinamento.  
* **RNF-006 (Integração):** As integrações com sistemas externos (como o PEP) devem utilizar APIs (preferencialmente REST) e padrões de interoperabilidade de saúde (como HL7/FHIR).  
* **RNF-007 (Restrição de Infraestrutura):** O software deve ser compatível com infraestrutura de TI de baixo custo e conectividade de internet limitada, se aplicável.  
* **RNF-008 (Infraestrutura Técnica):** O sistema deve ser baseado em infraestrutura de nuvem.

