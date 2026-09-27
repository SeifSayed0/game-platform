import { useMemo, useReducer, useState } from 'react'
import {
  case017Game,
  type Case017Action,
  type Case017Deduction,
  type Case017EvidenceId,
  type Case017PersonId,
} from '../game'
import {
  case017DeductionQuestions,
  case017Evidence,
  case017Hints,
  case017People,
} from '../content'
import './Case017Game.css'

const initialState = case017Game.createInitialState()

const openingEvidenceIds: Case017EvidenceId[] = [
  'phone',
  'clock',
  'door',
  'coffee',
]

const unlockOrder: Case017EvidenceId[] = [
  'phone',
  'clock',
  'door',
  'coffee',
  'camera',
  'guard',
  'service-stairs',
  'note-417',
  'account-file',
  'adam-message',
  'mazen-statement',
  'window',
]

type Screen =
  | 'intro'
  | 'brief'
  | 'tutorial'
  | 'investigation'

function gameReducer(
  state: typeof initialState,
  action: Case017Action,
) {
  return case017Game.reduce(state, action)
}

function Case017Game() {
  const [state, dispatch] = useReducer(
    gameReducer,
    initialState,
  )

  const [screen, setScreen] = useState<Screen>('intro')
  const [selectedEvidence, setSelectedEvidence] =
    useState<Case017EvidenceId | null>(null)

  const [activeTab, setActiveTab] = useState<
    'evidence' | 'people' | 'theory' | 'solution'
  >('evidence')

  const selectedEvidenceData = useMemo(
    () =>
      case017Evidence.find(
        (evidence) => evidence.id === selectedEvidence,
      ),
    [selectedEvidence],
  )

  const unlockedEvidenceCount =
    state.discoveredEvidence.length >= 7
      ? case017Evidence.length
      : Math.min(
          openingEvidenceIds.length +
            Math.max(
              0,
              Math.floor(state.discoveredEvidence.length / 2),
            ),
          case017Evidence.length,
        )

  const availableEvidenceIds = unlockOrder.slice(
    0,
    unlockedEvidenceCount,
  )

  const canOpenTheory =
    state.discoveredEvidence.length >= 4

  const canOpenSolution =
    state.discoveredEvidence.length >= 8

  function discoverEvidence(id: Case017EvidenceId) {
    dispatch({
      type: 'DISCOVER_EVIDENCE',
      evidenceId: id,
    })

    dispatch({
      type: 'VIEW_EVIDENCE',
      evidenceId: id,
    })

    setSelectedEvidence(id)
  }

  function discoverPerson(id: Case017PersonId) {
    dispatch({
      type: 'DISCOVER_PERSON',
      personId: id,
    })
  }

  function useHint() {
    const nextHint = case017Hints[state.hintsUsed]

    if (!nextHint) {
      return
    }

    dispatch({
      type: 'USE_HINT',
    })
  }

  function openDeduction() {
    if (!canOpenSolution) {
      return
    }

    dispatch({
      type: 'OPEN_DEDUCTION',
    })

    setActiveTab('solution')
  }

  function submitDeduction(deduction: Case017Deduction) {
    dispatch({
      type: 'SUBMIT_DEDUCTION',
      deduction,
    })
  }

  if (screen === 'intro') {
    return (
      <section className="case017 case017--opening">
        <div className="case017__opening-content">
          <span className="case017__opening-label">
            ملف القضية 017
          </span>

          <div className="case017__opening-mark">017</div>

          <h1>الساعة التي لم تتوقف</h1>

          <p className="case017__opening-lead">
            مكالمة طوارئ قصيرة. شقة مغلقة من الداخل.
            وشخص اختفى دون أن يترك وراءه تفسيرًا واضحًا.
          </p>

          <div className="case017__opening-call">
            <span>آخر تسجيل معروف — 02:17</span>
            <strong>
              «هو لسه هنا... بس محدش شايفه.»
            </strong>
          </div>

          <button
            className="case017__primary case017__opening-action"
            type="button"
            onClick={() => setScreen('brief')}
          >
            فتح ملف القضية
          </button>
        </div>
      </section>
    )
  }

  if (screen === 'brief') {
    return (
      <section className="case017 case017--opening">
        <div className="case017__brief">
          <div className="case017__brief-heading">
            <span className="case017__detail-category">
              ملف القضية
            </span>

            <h1>اختفاء آدم ناصر</h1>

            <p>
              عند وصول الشرطة إلى الشقة رقم 17، لم يجدوا
              صاحبها رغم أن الباب كان مغلقًا من الداخل.
            </p>
          </div>

          <div className="case017__brief-grid">
            <article>
              <span>المختفي</span>
              <strong>آدم ناصر</strong>
              <p>29 سنة — محاسب</p>
            </article>

            <article>
              <span>المكان</span>
              <strong>الشقة 17</strong>
              <p>مبنى سكني</p>
            </article>

            <article>
              <span>آخر وقت معروف</span>
              <strong>02:17</strong>
              <p>مكالمة طوارئ قصيرة</p>
            </article>
          </div>

          <div className="case017__mission">
            <span>مهمتك كمحقق</span>

            <h2>اكتشف القصة التي تربط التفاصيل ببعضها.</h2>

            <ul>
              <li>ماذا حدث لآدم؟</li>
              <li>ما معنى 02:17؟</li>
              <li>لماذا اختفى؟</li>
              <li>وما قصة الرقم 417؟</li>
            </ul>
          </div>

          <button
            className="case017__primary"
            type="button"
            onClick={() => setScreen('tutorial')}
          >
            فهمت القضية
          </button>
        </div>
      </section>
    )
  }

  if (screen === 'tutorial') {
    return (
      <section className="case017 case017--opening">
        <div className="case017__tutorial">
          <span className="case017__detail-category">
            قبل أن تبدأ
          </span>

          <h1>أنت مش مطالب تحلها دلوقتي.</h1>

          <p className="case017__tutorial-intro">
            مهمتك الأولى بسيطة: افحص المكان، اقرأ الأدلة،
            واحتفظ بأي تفصيلة تحس إنها مش راكبة.
          </p>

          <div className="case017__tutorial-steps">
            <article>
              <span>01</span>
              <strong>افحص</strong>
              <p>كل دليل ممكن يخبي تفصيلة مهمة.</p>
            </article>

            <article>
              <span>02</span>
              <strong>اربط</strong>
              <p>قارن الأوقات والأشخاص والأشياء.</p>
            </article>

            <article>
              <span>03</span>
              <strong>استنتج</strong>
              <p>لما تجمع معلومات كفاية، ابنِ نظريتك.</p>
            </article>
          </div>

          <div className="case017__tutorial-note">
            <strong>ملاحظة:</strong>
            مش كل حاجة هتشوفها هتكون مهمة. بعض التفاصيل
            موجودة عشان تختبر ملاحظتك.
          </div>

          <button
            className="case017__primary"
            type="button"
            onClick={() => setScreen('investigation')}
          >
            ابدأ التحقيق
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="case017">
      <header className="case017__header">
        <div>
          <span className="case017__eyebrow">
            القضية 017
          </span>

          <h1>الساعة التي لم تتوقف</h1>

          <p>
            افحص الأدلة وابحث عن التفاصيل التي لا تتفق
            مع بعضها.
          </p>
        </div>

        <div className="case017__score">
          <span>تقدم التحقيق</span>
          <strong>
            {state.discoveredEvidence.length}/
            {case017Evidence.length}
          </strong>
        </div>
      </header>

      <div className="case017__progress">
        <div
          style={{
            width: `${Math.min(
              100,
              (state.discoveredEvidence.length /
                case017Evidence.length) *
                100,
            )}%`,
          }}
        />
      </div>

      <div className="case017__tabs">
        <button
          type="button"
          className={
            activeTab === 'evidence' ? 'is-active' : ''
          }
          onClick={() => setActiveTab('evidence')}
        >
          الأدلة
        </button>

        <button
          type="button"
          className={
            activeTab === 'people' ? 'is-active' : ''
          }
          onClick={() => setActiveTab('people')}
        >
          الأشخاص
        </button>

        <button
          type="button"
          className={
            activeTab === 'theory' ? 'is-active' : ''
          }
          onClick={() => {
            if (canOpenTheory) {
              setActiveTab('theory')
            }
          }}
          disabled={!canOpenTheory}
        >
          لوحة التحقيق
          {!canOpenTheory && <small>4 أدلة</small>}
        </button>

        <button
          type="button"
          className={
            activeTab === 'solution' ? 'is-active' : ''
          }
          onClick={() => {
            if (canOpenSolution) {
              setActiveTab('solution')
            }
          }}
          disabled={!canOpenSolution}
        >
          الاستنتاج
          {!canOpenSolution && <small>8 أدلة</small>}
        </button>
      </div>

      {activeTab === 'evidence' && (
        <div className="case017__investigation-intro">
          {state.discoveredEvidence.length === 0 && (
            <div className="case017__next-step">
              <span>أول خطوة</span>
              <strong>ابدأ بفحص الأدلة الموجودة.</strong>
              <p>
                اختار أي دليل من القائمة. كل ما تكتشف
                أدلة جديدة، هتظهر خيوط إضافية.
              </p>
            </div>
          )}

          {state.discoveredEvidence.length >= 7 && (
            <div className="case017__next-step case017__next-step--ready">
              <span>مرحلة التحقيق التالية</span>
              <strong>جمعت خيوط كفاية. دلوقتي ابدأ تربط الصورة ببعضها.</strong>
              <p>
                مش محتاج تفضل تدور على دليل جديد. افتح لوحة التحقيق
                وراجع الأدلة والتوقيت والأشخاص قبل ما تحسم القضية.
              </p>
              <button
                className="case017__primary"
                type="button"
                onClick={() => setActiveTab('theory')}
              >
                فتح لوحة التحقيق
              </button>
            </div>
          )}

          <div className="case017__layout">
            <div className="case017__evidence-list">
              {case017Evidence.map((evidence) => {
                const discovered =
                  state.discoveredEvidence.includes(
                    evidence.id,
                  )

                const available =
                  availableEvidenceIds.includes(evidence.id)

                if (!available) {
                  return (
                    <div
                      key={evidence.id}
                      className="case017__evidence-locked"
                    >
                      <span>?</span>
                      <div>
                        <strong>دليل جديد</strong>
                        <small>
                          سيظهر مع تقدم التحقيق
                        </small>
                      </div>
                    </div>
                  )
                }

                return (
                  <button
                    key={evidence.id}
                    type="button"
                    className={`case017__evidence-card ${
                      discovered ? 'is-discovered' : ''
                    } ${
                      selectedEvidence === evidence.id
                        ? 'is-selected'
                        : ''
                    }`}
                    onClick={() =>
                      discoverEvidence(evidence.id)
                    }
                  >
                    <span className="case017__evidence-number">
                      {discovered ? '✓' : '?'}
                    </span>

                    <span>
                      <strong>{evidence.title}</strong>
                      <small>{evidence.location}</small>
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="case017__evidence-detail">
              {selectedEvidenceData ? (
                <>
                  <span className="case017__detail-category">
                    {selectedEvidenceData.category}
                  </span>

                  <h2>{selectedEvidenceData.title}</h2>

                  <p>
                    {selectedEvidenceData.summary}
                  </p>

                  <ul>
                    {selectedEvidenceData.details.map(
                      (detail) => (
                        <li key={detail}>{detail}</li>
                      ),
                    )}
                  </ul>

                  {selectedEvidenceData.isRedHerring && (
                    <div className="case017__warning">
                      هذه التفصيلة قد تكون مضللة.
                    </div>
                  )}
                </>
              ) : (
                <div className="case017__empty">
                  <span>017</span>
                  <p>
                    اختار دليلًا عشان تبدأ فحصه.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'people' && (
        <div className="case017__people">
          <div className="case017__next-step">
            <span>ملفات الأشخاص</span>
            <strong>
              الشخصيات جزء من الصورة، لكن مش كل شخص مشتبه
              فيه.
            </strong>
            <p>
              افتح الملفات وقارن كلامهم بالأدلة اللي
              اكتشفتها.
            </p>
          </div>

          {case017People.map((person) => {
            const discovered =
              state.discoveredPeople.includes(person.id)

            return (
              <button
                key={person.id}
                type="button"
                className={`case017__person ${
                  discovered ? 'is-discovered' : ''
                }`}
                onClick={() =>
                  discoverPerson(person.id)
                }
              >
                <span className="case017__person-avatar">
                  {person.name.charAt(0)}
                </span>

                <span>
                  <strong>{person.name}</strong>
                  <small>{person.role}</small>
                  <em>{person.description}</em>
                </span>
              </button>
            )
          })}
        </div>
      )}

      {activeTab === 'theory' && (
        <div className="case017__theory">
          <div>
            <span className="case017__detail-category">
              لوحة التحقيق
            </span>

            <h2>إيه اللي حصل فعلًا؟</h2>

            <p>
              أنت دلوقتي جمعت معلومات كفاية تبدأ تربط
              التوقيت بالأدلة والأشخاص.
            </p>
          </div>

          <div className="case017__theory-stats">
            <div>
              <span>أدلة مكتشفة</span>
              <strong>
                {state.discoveredEvidence.length}
              </strong>
            </div>

            <div>
              <span>أشخاص</span>
              <strong>
                {state.discoveredPeople.length}
              </strong>
            </div>

            <div>
              <span>تلميحات</span>
              <strong>{state.hintsUsed}</strong>
            </div>
          </div>

          <div className="case017__hint">
            <div>
              <span>تلميح التحقيق</span>
              <p>
                {case017Hints[state.hintsUsed]?.text ??
                  'استنفدت كل التلميحات المتاحة.'}
              </p>
            </div>

            <button
              type="button"
              onClick={useHint}
              disabled={
                state.hintsUsed >= case017Hints.length
              }
            >
              استخدم التلميح
            </button>
          </div>

          <div className="case017__next-step">
            <span>الخطوة التالية</span>
            <strong>
              راجع الأدلة والتوقيت قبل ما تحسم القضية.
            </strong>
            <p>
              أنت وصلت لمرحلة كفاية تبدأ فيها تكوين تفسيرك.
              لو لسه مش واثق، ارجع للأدلة وقارن التفاصيل المشتركة بينها.
            </p>
          </div>

          <button
            className="case017__primary"
            type="button"
            disabled={!canOpenSolution}
            onClick={openDeduction}
          >
            الانتقال إلى الاستنتاج
          </button>
        </div>
      )}

      {activeTab === 'solution' && (
        <DeductionPanel
          deduction={state.deduction}
          finished={state.phase === 'finished'}
          score={state.result?.score ?? null}
          correctAnswers={
            state.result?.correctAnswers ?? null
          }
          onSubmit={submitDeduction}
        />
      )}
    </section>
  )
}

type DeductionPanelProps = {
  deduction: Case017Deduction
  finished: boolean
  score: number | null
  correctAnswers: number | null
  onSubmit: (deduction: Case017Deduction) => void
}

function DeductionPanel({
  deduction,
  finished,
  score,
  correctAnswers,
  onSubmit,
}: DeductionPanelProps) {
  const [answers, setAnswers] =
    useState<Case017Deduction>(deduction)

  function updateAnswer(
    key: keyof Case017Deduction,
    value: string,
  ) {
    setAnswers((current) => ({
      ...current,
      [key]: value,
    }))
  }

  if (finished) {
    return (
      <div className="case017__result">
        <span className="case017__detail-category">
          النتيجة
        </span>

        <h2>
          {correctAnswers === 4
            ? 'أعدت بناء القضية بالكامل.'
            : correctAnswers === 3
              ? 'عرفت ما حدث، لكن جزءًا من الدافع ظل غامضًا.'
              : correctAnswers === 2
                ? 'أمسكت بالخيط الصحيح، لكن الأدلة لم تكتمل.'
                : 'هناك شيء مهم فاتك.'}
        </h2>

        <div className="case017__result-score">
          <strong>{score}</strong>
          <span>/ 100</span>
        </div>

        <p>
          الإجابات الصحيحة: {correctAnswers}/4
        </p>
      </div>
    )
  }

  return (
    <div className="case017__deduction">
      <span className="case017__detail-category">
        إعادة بناء القضية
      </span>

      <h2>إيه تفسيرك لكل اللي حصل؟</h2>

      <p>
        اختار إجابة واحدة لكل سؤال. المطلوب تبني
        النظرية من الأدلة اللي جمعتها.
      </p>

      <div className="case017__questions">
        {case017DeductionQuestions.map((question) => {
          const currentValue = answers[question.id]

          return (
            <fieldset key={question.id}>
              <legend>{question.title}</legend>

              {question.options.map((option) => (
                <label key={option.value}>
                  <input
                    type="radio"
                    name={question.id}
                    value={option.value}
                    checked={
                      currentValue === option.value
                    }
                    onChange={() =>
                      updateAnswer(
                        question.id,
                        option.value,
                      )
                    }
                  />

                  <span>{option.label}</span>
                </label>
              ))}
            </fieldset>
          )
        })}
      </div>

      <button
        className="case017__primary"
        type="button"
        disabled={
          !answers.whatHappened ||
          !answers.meaningOf217 ||
          !answers.reason ||
          !answers.meaningOf417
        }
        onClick={() => onSubmit(answers)}
      >
        حسم القضية
      </button>
    </div>
  )
}

export default Case017Game
