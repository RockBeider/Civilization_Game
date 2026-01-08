import { SLOT_COUNT, AGES, RACES } from '@/data/constants';
import { User, Save, FilePlus, X } from './Icons';

export function SaveLoadModal({ mode, onClose, onAction, slots }) {
    return (
        <div className="modal-overlay animate-fade-in">
            <div className="modal">
                <div className="modal-header">
                    <h3 className="modal-title">
                        {mode === 'save' ? <Save size={20} className="icon-blue" /> : <FilePlus size={20} className="icon-green" />}
                        {mode === 'save' ? '게임 저장' : '게임 불러오기'}
                    </h3>
                    <button onClick={onClose} className="modal-close"><X size={20} /></button>
                </div>
                <div className="modal-body">
                    <div className="slot-list">
                        {Array.from({ length: SLOT_COUNT }).map((_, idx) => {
                            const slotId = idx + 1;
                            const data = slots[slotId];
                            const race = data ? RACES.find(r => r.id === data.selectedRaceId) : null;

                            return (
                                <div key={slotId}
                                    onClick={() => onAction(slotId)}
                                    className={`slot-card ${data ? 'has-data' : 'empty'}`}>
                                    <div className="slot-content">
                                        <div className="slot-number">#{slotId}</div>
                                        {data ? (
                                            <div className="slot-info">
                                                <div className="slot-icon">{race ? <User size={24} /> : <User size={24} />}</div>
                                                <div>
                                                    <div className="slot-race">{race ? race.name : '알 수 없음'}</div>
                                                    <div className="slot-meta">{AGES[data.currentAge].name} • {new Date(data.timestamp).toLocaleString()}</div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="slot-empty-text">비어 있음</div>
                                        )}
                                    </div>
                                    {mode === 'save' && <div className="slot-action save">{data ? '덮어쓰기' : '저장하기'}</div>}
                                    {mode === 'load' && data && <div className="slot-action load">불러오기</div>}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div >
    );
}
