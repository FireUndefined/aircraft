interface IHealthPoint {
    reduce(num: number): void;

    reset(): void;
}

interface canHit {
    hitRect: hitRectType
}