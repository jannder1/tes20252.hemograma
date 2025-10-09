# Matriz de Priorização - Riscos Técnicos e de Escopo

## Metodologia de Avaliação

### Impacto (I)
- **Crítico (4)**: Pode causar danos à saúde, multas pesadas, inviabilizar o projeto
- **Alto (3)**: Afeta significativamente funcionalidade ou compliance
- **Médio (2)**: Afeta experiência do usuário ou operação
- **Baixo (1)**: Impacto limitado ou facilmente contornável

### Complexidade (C)
- **Alta (3)**: Requer mudanças arquiteturais significativas, expertise especializado, tempo > 3 meses
- **Média (2)**: Requer desenvolvimento substancial, tempo 1-3 meses
- **Baixa (1)**: Solução direta com ferramentas/frameworks existentes, tempo < 1 mês

### Probabilidade (P)
- **Alta (3)**: Muito provável de ocorrer (>70%)
- **Média (2)**: Probabilidade moderada (30-70%)
- **Baixa (1)**: Pouco provável (<30%)

### Score de Prioridade = I × P × C

## Matriz de Riscos por História de Usuário

### HU-001: Entrada de Dados do Hemograma

| ID | Risco | Tipo | I | C | P | Score | Prioridade |
|---|---|---|---|---|---|---|---|
| R1.1 | Validação inconsistente permite valores impossíveis | Técnico | 3 | 1 | 3 | 9 | P2 |
| R1.2 | Interface não responsiva | Técnico | 2 | 1 | 2 | 4 | P4 |
| R1.3 | Falha na integração com sistemas laboratoriais | Técnico | 2 | 2 | 2 | 8 | P3 |
| R1.4 | Variação de formatos entre laboratórios | Técnico | 1 | 1 | 3 | 3 | P4 |
| R1.5 | Parâmetros adicionais não contemplados | Escopo | 3 | 2 | 3 | 18 | P2 |
| R1.6 | Requisitos de acessibilidade expandem escopo | Escopo | 2 | 2 | 2 | 8 | P3 |

### HU-002: Detecção de Padrões Anormais

| ID | Risco | Tipo | I | C | P | Score | Prioridade |
|---|---|---|---|---|---|---|---|
| R2.1 | Falsos positivos/negativos | Técnico | 4 | 3 | 3 | 36 | P1 |
| R2.2 | Degradação de performance com múltiplas análises | Técnico | 3 | 2 | 2 | 12 | P3 |
| R2.3 | Base de conhecimento incompleta/desatualizada | Técnico | 3 | 3 | 2 | 18 | P1 |
| R2.4 | Combinações raras não detectadas | Técnico | 2 | 2 | 2 | 8 | P3 |
| R2.5 | Responsabilidade médico-legal | Escopo | 4 | 3 | 3 | 36 | P1 |
| R2.6 | Validação clínica extensa não prevista | Escopo | 3 | 3 | 3 | 27 | P1 |
| R2.7 | Certificação ANVISA requerida | Escopo | 3 | 3 | 3 | 27 | P1 |
| R2.8 | Parâmetros específicos por população | Escopo | 2 | 2 | 3 | 12 | P3 |

### HU-003: Geração de Relatório com IA

| ID | Risco | Tipo | I | C | P | Score | Prioridade |
|---|---|---|---|---|---|---|---|
| R3.1 | LLM gera informações incorretas (alucinações) | Técnico | 4 | 3 | 3 | 36 | P1 |
| R3.2 | Dependência de APIs externas causa indisponibilidade | Técnico | 4 | 2 | 3 | 24 | P1 |
| R3.3 | Custo de API proibitivo com escala | Técnico | 3 | 3 | 2 | 18 | P1 |
| R3.4 | Latência alta frustra usuários | Técnico | 3 | 2 | 2 | 12 | P3 |
| R3.5 | Privacidade ao enviar dados para LLM externo | Técnico | 2 | 2 | 3 | 12 | P3 |
| R3.6 | LGPD/GDPR proíbem envio de dados médicos | Escopo | 4 | 3 | 3 | 36 | P1 |
| R3.7 | Necessidade de LLM on-premise não prevista | Escopo | 3 | 3 | 2 | 18 | P1 |
| R3.8 | Validação médica de cada tipo de relatório | Escopo | 3 | 3 | 3 | 27 | P1 |
| R3.9 | Tradução e adaptação cultural | Escopo | 2 | 2 | 2 | 8 | P3 |

### HU-004: Histórico de Pacientes

| ID | Risco | Tipo | I | C | P | Score | Prioridade |
|---|---|---|---|---|---|---|---|
| R4.1 | Vulnerabilidades de segurança em dados sensíveis | Técnico | 3 | 2 | 2 | 12 | P2 |
| R4.2 | Problemas de escalabilidade do banco | Técnico | 3 | 2 | 2 | 12 | P3 |
| R4.3 | Performance degradada com grande volume | Técnico | 2 | 2 | 2 | 8 | P3 |
| R4.4 | Backup e recuperação inadequados | Técnico | 2 | 2 | 2 | 8 | P3 |
| R4.5 | Não conformidade com LGPD | Escopo | 4 | 3 | 3 | 36 | P1 |
| R4.6 | Auditoria e rastreabilidade obrigatórias | Escopo | 3 | 2 | 3 | 18 | P2 |
| R4.7 | Retenção de dados regulamentada | Escopo | 3 | 2 | 2 | 12 | P3 |
| R4.8 | Direito de exclusão de dados | Escopo | 2 | 2 | 2 | 8 | P3 |

### HU-005: Alertas Críticos

| ID | Risco | Tipo | I | C | P | Score | Prioridade |
|---|---|---|---|---|---|---|---|
| R5.1 | Falha no sistema de alertas | Técnico | 4 | 2 | 2 | 16 | P1 |
| R5.2 | Configuração incorreta (falsos alarmes/silêncio) | Técnico | 3 | 2 | 2 | 12 | P2 |
| R5.3 | Sistema de notificação falha | Técnico | 2 | 2 | 2 | 8 | P3 |
| R5.4 | Alertas não visualizados a tempo | Técnico | 1 | 1 | 2 | 2 | P4 |
| R5.5 | Responsabilidade legal por falha | Escopo | 3 | 2 | 2 | 12 | P2 |
| R5.6 | Necessidade de alta disponibilidade/redundância | Escopo | 3 | 3 | 2 | 18 | P1 |
| R5.7 | Variação de protocolos entre instituições | Escopo | 2 | 2 | 2 | 8 | P3 |
| R5.8 | Personalização excessiva | Escopo | 1 | 1 | 1 | 1 | P4 |

## Top 20 Riscos Críticos (Score ≥ 18)

| Rank | ID | História | Risco | Score | Ação Imediata |
|---|---|---|---|---|---|
| 1 | R2.1 | HU-002 | Falsos positivos/negativos | 36 | Estabelecer comitê médico, validação clínica rigorosa |
| 2 | R2.5 | HU-002 | Responsabilidade médico-legal | 36 | Consultar jurídico, disclaimers claros, seguro |
| 3 | R3.1 | HU-003 | Alucinações de LLM | 36 | Camada de validação, modelos especializados |
| 4 | R3.6 | HU-003 | Violação LGPD/GDPR | 36 | Avaliar LLM on-premise, anonimização |
| 5 | R4.5 | HU-004 | Não conformidade LGPD | 36 | Arquitetura privacy-by-design desde início |
| 6 | R2.6 | HU-002 | Validação clínica não prevista | 27 | Incluir no escopo e cronograma |
| 7 | R2.7 | HU-002 | Certificação ANVISA | 27 | Iniciar processo imediatamente |
| 8 | R3.8 | HU-003 | Validação de relatórios | 27 | Protocolo de validação estruturado |
| 9 | R3.2 | HU-003 | Dependência de API externa | 24 | Múltiplos provedores, fallback |
| 10 | R1.5 | HU-001 | Parâmetros não contemplados | 18 | Arquitetura extensível, mapeamento configurável |
| 11 | R2.3 | HU-002 | Base conhecimento incompleta | 18 | Parceria com instituições médicas |
| 12 | R3.3 | HU-003 | Custo API proibitivo | 18 | Análise econômica, considerar alternativas |
| 13 | R3.7 | HU-003 | LLM on-premise necessário | 18 | Estudo de viabilidade técnica/financeira |
| 14 | R4.6 | HU-004 | Auditoria obrigatória | 18 | Implementar logging completo desde início |
| 15 | R5.6 | HU-005 | Alta disponibilidade necessária | 18 | Arquitetura resiliente, redundância |

## Estratégia de Mitigação por Prioridade

### P1 - Crítica (Ação Imediata)
**15 riscos com score ≥ 18**

**Ações:**
1. Formar comitê de riscos e compliance
2. Contratar consultoria regulatória (ANVISA)
3. Contratar consultoria jurídica (LGPD)
4. Estabelecer parceria com instituição médica para validação
5. Decisão arquitetural sobre LLM (3 semanas)
6. Implementar framework de segurança e auditoria

**Investimento Estimado:** R$ 200-400k  
**Prazo:** Antes de qualquer desenvolvimento

### P2 - Alta (Curto Prazo - 1-3 meses)
**6 riscos com score 9-17**

**Ações:**
1. Implementar validações robustas de entrada
2. Sistema de auditoria e rastreabilidade
3. Configuração de alertas com testes rigorosos
4. Segurança de dados sensíveis (criptografia)

**Investimento Estimado:** R$ 100-150k  
**Prazo:** Durante primeiros sprints

### P3 - Média (Médio Prazo - 3-6 meses)
**16 riscos com score 4-8**

**Ações:**
1. Otimização de performance
2. Integração com sistemas laboratoriais
3. Protocolos de backup e recuperação
4. Sistema de notificações robusto

**Investimento Estimado:** R$ 80-120k  
**Prazo:** Durante desenvolvimento

### P4 - Baixa (Longo Prazo - 6+ meses)
**6 riscos com score 1-3**

**Ações:**
1. Melhorias de UX/responsividade
2. Personalização de interface
3. Features adicionais conforme feedback

**Investimento Estimado:** R$ 30-50k  
**Prazo:** Pós-MVP

## Investimento Total em Mitigação: R$ 410-720k

## Recomendações Executivas

### 1. Gate de Go/No-Go
Antes de iniciar desenvolvimento, resolver:
- Estratégia de LLM (próprio vs. API)
- Viabilidade de certificação ANVISA
- Compliance LGPD completo
- Responsabilidade médico-legal definida

### 2. Modelo de Desenvolvimento
- **Fase 1**: Fundação e Compliance (3 meses)
- **Fase 2**: MVP com funcionalidades core (3 meses)
- **Fase 3**: Validação clínica (3-6 meses)
- **Fase 4**: Certificação e Lançamento (3-6 meses)

**Total: 12-18 meses**

### 3. Equipe Requerida
- Product Owner médico
- Especialista em regulação (ANVISA)
- Especialista em LGPD/privacidade
- Arquiteto de segurança
- Especialista em LLM/ML médico
- QA especializado em software médico

### 4. Indicadores de Sucesso
- 0 violações de compliance
- Taxa de falsos positivos < 5%
- Taxa de falsos negativos < 1%
- 99.9% de disponibilidade do sistema
- Aprovação em validação clínica
- Certificação ANVISA obtida

## Conclusão

O projeto apresenta **27 riscos críticos (P1)** que devem ser mitigados antes ou durante as fases iniciais. O foco deve ser:

1. **Compliance regulatório** (LGPD, ANVISA)
2. **Acurácia médica** (validação clínica rigorosa)
3. **Arquitetura de IA** (decisão sobre LLM)
4. **Segurança** (dados sensíveis de saúde)

O sucesso do projeto depende de investimento significativo em mitigação de riscos (R$ 410-720k) e cronograma realista (12-18 meses). Tentativas de acelerar sem mitigação adequada aumentam drasticamente a probabilidade de falha regulatória, legal ou técnica.
