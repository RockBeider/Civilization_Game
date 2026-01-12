import React, { useMemo } from 'react';
import { TECH_TREE, AGES } from '@/data/constants';
import { Lock, Check, X, FlaskConical } from './Icons';

const COL_WIDTH = 340;
const ROW_HEIGHT = 180;
const CARD_WIDTH = 280;
const CARD_HEIGHT = 120;
const X_PAD = 40; // Padding inside column
const Y_PAD = 40; // Top padding

export function TechTreeModal({ onClose, researched, resources, currentAge, onResearch, selectedRace }) {

    // Sort logic or simple mapping? We rely on TECH_TREE having 'row' and 'ageReq'.

    const getTechPos = (tech) => {
        // Handle 'col' offset if present (e.g. Writing)
        // If col is set, we treat it as shifting right within the age column?
        // Let's assume simplest: Age is the primary column index.
        // If col=1, adding 0.5 to x? Or just treat it as (Age + 0.5)?
        const ageIndex = tech.ageReq;
        const colOffset = tech.col || 0;

        const x = (ageIndex + colOffset * 0.5) * COL_WIDTH + X_PAD;
        const y = tech.row * ROW_HEIGHT + Y_PAD;

        return { x, y };
    };

    const connections = useMemo(() => {
        const lines = [];
        TECH_TREE.forEach(tech => {
            if (tech.reqTech) {
                const reqs = Array.isArray(tech.reqTech) ? tech.reqTech : [tech.reqTech];
                reqs.forEach(reqId => {
                    const reqTech = TECH_TREE.find(t => t.id === reqId);
                    if (reqTech) {
                        const start = getTechPos(reqTech);
                        const end = getTechPos(tech);
                        lines.push({
                            id: `${reqId}-${tech.id}`,
                            x1: start.x + CARD_WIDTH,
                            y1: start.y + CARD_HEIGHT / 2,
                            x2: end.x,
                            y2: end.y + CARD_HEIGHT / 2,
                            locked: !researched.includes(reqId)
                        });
                    }
                });
            }
        });
        return lines;
    }, [researched]);

    const totalWidth = 6 * COL_WIDTH + X_PAD * 2; // 6 Ages
    const totalHeight = 5 * ROW_HEIGHT + Y_PAD * 2; // ~4-5 rows

    return (
        <div className="modal-overlay animate-fade-in" style={{ zIndex: 60 }}>
            <div className="tech-tree-modal">
                <div className="modal-header">
                    <h3 className="modal-title">
                        <FlaskConical size={20} className="icon-blue" /> 기술 연구소
                    </h3>
                    <div className="modal-controls">
                        <div className="science-display">
                            <FlaskConical size={16} className="text-blue" />
                            <span>{Math.floor(resources.sci).toLocaleString()}</span>
                        </div>
                        <button onClick={onClose} className="modal-close"><X size={20} /></button>
                    </div>
                </div>

                <div className="tech-tree-container">
                    <div className="tech-tree-scroll-content" style={{ width: totalWidth, height: totalHeight }}>

                        {/* Background Grid / Ages Labels */}
                        <div className="tech-ages-layer">
                            {AGES.map((age, i) => (
                                <div key={age.id} className="age-column" style={{ left: i * COL_WIDTH, width: COL_WIDTH }}>
                                    <div className={`age-label ${i <= currentAge ? 'active' : ''}`}>{age.name}</div>
                                </div>
                            ))}
                        </div>

                        {/* Connections Layer */}
                        <svg className="tech-connections-layer" width={totalWidth} height={totalHeight}>
                            {connections.map(line => (
                                <path
                                    key={line.id}
                                    d={`M ${line.x1} ${line.y1} C ${line.x1 + 50} ${line.y1}, ${line.x2 - 50} ${line.y2}, ${line.x2} ${line.y2}`}
                                    fill="none"
                                    stroke={line.locked ? "#334155" : "#6366f1"}
                                    strokeWidth="2"
                                    className="connection-line"
                                />
                            ))}
                        </svg>

                        {/* Nodes Layer */}
                        {TECH_TREE.map(tech => {
                            const { x, y } = getTechPos(tech);
                            const isResearched = researched.includes(tech.id);

                            // Check availability logic
                            // Copying simplified logic from App.jsx
                            // 1. Check reqRace
                            if (tech.reqRace && tech.reqRace !== selectedRace.id) return null;

                            // 2. Check Prerequisites
                            let isLocked = false;
                            const reqs = Array.isArray(tech.reqTech) ? tech.reqTech : (tech.reqTech ? [tech.reqTech] : []);
                            reqs.forEach(reqId => {
                                if (!researched.includes(reqId)) isLocked = true;
                            });

                            // 3. Check Age
                            const isAgeRestricted = tech.ageReq > currentAge;

                            const isAvailable = !isResearched && !isLocked && !isAgeRestricted;
                            const canAfford = resources.sci >= tech.cost;

                            return (
                                <div
                                    key={tech.id}
                                    className={`tech-tree-node ${isResearched ? 'researched' : ''} ${isAvailable ? (canAfford ? 'affordable' : 'unaffordable') : 'locked'}`}
                                    style={{ left: x, top: y, width: CARD_WIDTH, height: CARD_HEIGHT }}
                                    onClick={() => {
                                        if (isAvailable && canAfford) {
                                            onResearch(tech);
                                        }
                                    }}
                                >
                                    {/* Background Image */}
                                    {tech.img && (
                                        <>
                                            <div className="node-bg" style={{ backgroundImage: `url(${tech.img})` }}></div>
                                            <div className="node-overlay"></div>
                                        </>
                                    )}

                                    <div className="node-content">
                                        <div className="node-header">
                                            <span className="node-name">{tech.name}</span>
                                            {isResearched ? <Check size={16} className="text-green" /> : (isLocked ? <Lock size={14} className="text-muted" /> : null)}
                                        </div>
                                        <div className="node-desc">{tech.desc}</div>
                                        {!isResearched && (
                                            <div className="node-cost">
                                                <FlaskConical size={12} /> {tech.cost.toLocaleString()}
                                            </div>
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
