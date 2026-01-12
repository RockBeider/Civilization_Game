import { BUILDINGS } from '@/data/constants';
import { Wrench, X, FlaskConical, ArrowUp } from './Icons';

export function UpgradeModal({ onClose, buildingLevels, resources, onUpgrade, getUpgradeCost }) {
    return (
        <div className="modal-overlay animate-fade-in">
            <div className="modal-lg">
                <div className="modal-header">
                    <h3 className="modal-title">
                        <Wrench size={20} className="icon-purple" /> 시설 기술 강화
                    </h3>
                    <button onClick={onClose} className="modal-close"><X size={20} /></button>
                </div>
                <div className="modal-body padded">
                    <p className="upgrade-intro">
                        건물의 기본 생산 효율을 영구적으로 증가시킵니다. <br />
                        <span className="highlight">레벨당 +30% 추가 효율</span>
                    </p>
                    <div className="upgrade-list">
                        {Object.keys(BUILDINGS).map(key => {
                            const currentLevel = buildingLevels[key] || 0;
                            const costSci = getUpgradeCost(key);
                            const canAfford = resources.sci >= costSci;
                            const isMax = currentLevel >= 10;

                            return (
                                <div key={key} className="upgrade-item">
                                    <div className="upgrade-item-header">
                                        <div className="item-name">{BUILDINGS[key].name}</div>
                                        <div className="item-level">
                                            Lv.{currentLevel}
                                            {!isMax && <span className="arrow"> → Lv.{currentLevel + 1}</span>}
                                        </div>
                                    </div>
                                    <div className="upgrade-item-footer">
                                        <div className="item-efficiency">
                                            효율: <span className="current">{100 + currentLevel * 30}%</span>
                                            {!isMax && <span className="next"> → {100 + (currentLevel + 1) * 30}% <ArrowUp size={10} /></span>}
                                        </div>
                                        {isMax ? (
                                            <button className="upgrade-action-btn maxed">최대 레벨</button>
                                        ) : (
                                            <button
                                                onClick={() => onUpgrade(key)}
                                                disabled={!canAfford}
                                                className={`upgrade-action-btn ${canAfford ? 'affordable' : 'unaffordable'}`}>
                                                <span className="cost">비용: <FlaskConical size={12} className="icon-blue" /> {costSci.toLocaleString()}</span>
                                                <ArrowUp size={12} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
